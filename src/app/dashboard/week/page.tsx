"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { IMoveTasksInput, IPlanInput, Plan, ITask, IBadgeInput } from "@/lib/types/planTypes";
import { updatePlan } from "@/lib/api/plansApi";
import { createBadge } from "@/lib/api/badgesApi";
import { setActivePlan, setNumTasks } from "@/lib/store/planSlice";
import { setIsCreateTaskOpen } from "@/lib/store/modalSlice";
import { usePlanByPlanId, useTasksByPlanIdAndWeek, usePlansByUserId } from "@/hooks/queries";
import { isDateBeforeOrToday } from "@/lib/utils/dateFunctions";
import dayjs from "dayjs";
import { User } from "@/lib/types/sessionTypes";
import { moveTasks } from "@/lib/api/tasksApi";
import { updateUser } from "@/lib/api/usersApi";
import { badgeColorPicker } from "@/lib/constants/badgesConstants";
import {
    setIsConfirmOpen, setIsLoading, setMessage,
    setOnConfirm, setIsPlanCompletedOpen, setCompletedPlan
} from "@/lib/store/modalSlice";
import { Kanban } from "./kanban";
import { ProgressBar, PlanSelector } from './components';
import { setUserData } from "@/lib/store/sessionSlice";
import Loading from "./loading";
import Error from "./error";
import Empty from "./empty";
import ExpandUp from "../../../../public/arrows/expandUp.svg";
import ExpandDown from "../../../../public/arrows/expandDown.svg";


export default function Week() {
    const dispatch = useAppDispatch();
    const activePlanId = useAppSelector(state => state.session.userData?.activePlanId); // user active plan
    const activePlan = useAppSelector(state => state.plan.activePlan);
    const userData = useAppSelector(state => state.session.userData);
    const queryClient = useQueryClient();
    const today = dayjs();

    const { isPending: isPendingPlans, error: errorPlans, data: allPlansData, isSuccess: allPlansSuccess } = usePlansByUserId(userData?.userId || "");
    const { isPending: isPendingPlan, error: errorPlan, data: planData, isSuccess: planSuccess } = usePlanByPlanId(activePlanId || "");
    const { isPending: isPendingTasks, error: errorTasks, data: tasksData, isSuccess: taskSuccess } = useTasksByPlanIdAndWeek(planData?._id, planData?.currWeek);

    const [cards, setCards] = useState<ITask[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [showPlansSelector, setShowPlansSelector] = useState<boolean>(false);
    const [showCompletedSection, setShowCompletedSection] = useState<boolean>(false);
    const completedTasks = cards.filter((c) => c.status === 'Completed').length;

    const weekProg: number = parseFloat((completedTasks / (cards.length || 1)).toFixed(2));
    const daysUntilWeekEnd: number = Math.ceil(dayjs(planData?.weekEndDate).diff(today, 'day', true));

    const moveTasksMutation = useMutation({
        mutationFn: (input: IMoveTasksInput) => {
            return moveTasks(input);
        },
        onError: () => {
            console.log('Error moving tasks');
            dispatch(setIsLoading(false));
        },
    });

    const updatePlanMutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return updatePlan(activePlanId || "", planInput);
        },
        onError: () => {
            console.log('Error updating plan');
            dispatch(setIsLoading(false));
        },
        onSuccess: () => {
            if (updatePlanMutation.data) {
                dispatch(setActivePlan(updatePlanMutation.data));
            }
        }
    });

    const updateUserMutation = useMutation({
        mutationFn: (userInput: Partial<User>) => {
            return updateUser(userData?.userId || "", userInput);
        },
        onError: () => {
            console.log('Error updating user');
            dispatch(setIsLoading(false));
        },
    });

    const createBadgeMutation = useMutation({
        mutationFn: (badgeInput: IBadgeInput) => {
            return createBadge(badgeInput);
        },
        onError: () => {
            console.log('Error creating badge');
        },
    });

    if (taskSuccess) {
        queryClient.invalidateQueries({ queryKey: ['weekTasks'] });
    }

    if (planSuccess) {
        queryClient.invalidateQueries({ queryKey: ['plan'] });
    }

    if (allPlansSuccess) {
        queryClient.invalidateQueries({ queryKey: ['plans'] });
    }

    const togglePlansSelector = () => {
        setShowPlansSelector(!showPlansSelector);
    };

    const startPlanEarly = () => {
        updatePlanMutation.mutate({
            startDate: dayjs(today).format('MM/DD/YYYY'),
            weekEndDate: dayjs(today).add(7, 'day').format('MM/DD/YYYY'),
            active: true,
        });
    }

    // Checks if the last week of the active plan is completed
    // NOTE: To be used for conditional rendering when date is past weekEndDate
    const isPlanCompleted = () => {
        if (planData?.completed) return true;
        return (planData?.numWeeks === planData?.currWeek) && (cards.length === completedTasks);
    }

    // Update week on Plan and move incomplete tasks
    const startNextWeek = async () => {
        dispatch(setIsLoading(true));

        try {
            // Update week progress
            await updatePlanMutation.mutateAsync({
                currWeek: planData.currWeek + 1,
                numWeeks: (planData.numWeeks === planData.currWeek) ? planData.numWeeks + 1 : planData.numWeeks,
                weekProg: 0,
                weekEndDate: today.add(7, 'day').format('MM/DD/YYYY'),
            });

            // Move incomplete tasks to next week
            await moveTasksMutation.mutateAsync({ planId: planData._id, week: planData.currWeek });

            // Invalidate and refetch the plan query first
            await queryClient.invalidateQueries({ queryKey: ['plan', activePlanId] });
            await queryClient.refetchQueries({ queryKey: ['plan', activePlanId] });

            // Then invalidate the weekTasks query
            await queryClient.invalidateQueries({ queryKey: ['weekTasks', activePlanId] });

            dispatch(setIsLoading(false));
        } catch (error) {
            console.log('Error handling mutations', error);
        }
    }

    // Updates plan as complete, creates badge, and shows Plan Completed Modal
    const completePlan = async () => {
        // Update plan on database
        updatePlanMutation.mutate({
            completed: true,
        });

        // Update plan on redux and state
        dispatch(setActivePlan({ ...planData, completed: true }));
        setPlans(plans.filter((plan: Plan) => plan._id !== planData._id));

        // Create Badge
        const badgeBody: IBadgeInput = {
            goal: planData.goal,
            weeks: planData.numWeeks,
            userId: userData?.userId || "",
            planId: planData._id,
            imageKey: badgeColorPicker(planData.numWeeks),
            completionDate: dayjs(today).format('MM/DD/YYYY'),
        }

        try {
            await createBadgeMutation.mutateAsync(badgeBody);
        } catch (error) {
            console.log('Error creating badge', error);
            return;
        }

        // Open Modal with badge
        dispatch(setCompletedPlan({ goal: planData.goal, weeks: planData.numWeeks }))
        dispatch(setIsPlanCompletedOpen(true));
        setShowCompletedSection(true);
    }

    const openConfirmModal = (message: string, onConfirm: () => void) => {
        dispatch(setMessage(message));
        dispatch(setOnConfirm(onConfirm));
        dispatch(setIsConfirmOpen(true));
    };

    // Pass props to confirmation modal (next week vs complete plan)
    const handleNextWeekButton = () => {
        if (planData?.numWeeks !== planData?.currWeek) { // Option 1: Next week
            const message = `Move to week ${(planData?.currWeek || 0) + 1}?`;
            openConfirmModal(message, startNextWeek);
        } else { // Option 2: Complete Plan
            const message = 'Complete this plan early?';
            openConfirmModal(message, completePlan);
        }
    }

    // Receive badge when plan is completed automatically
    const handleReceiveBadge = () => {
        const message = 'Complete this plan and receive badge?';
        openConfirmModal(message, completePlan);
    }

    // Handle active plan selection from list
    const handlePlanSelect = async (selectedPlan: Plan) => {
        dispatch(setIsLoading(true));
        setShowPlansSelector(false);

        try {
            dispatch(setUserData({ ...userData as User, activePlanId: selectedPlan._id }));
            dispatch(setActivePlan(selectedPlan));

            updateUserMutation.mutate({
                activePlanId: selectedPlan._id,
            });

            await queryClient.invalidateQueries({ queryKey: ['plan', activePlanId] });
            await queryClient.refetchQueries({ queryKey: ['plan', activePlanId] });

            await queryClient.invalidateQueries({ queryKey: ['weekTasks', activePlanId] });

            dispatch(setIsLoading(false));
        } catch (error) {
            console.log('Error selecting plan', error);
            dispatch(setIsLoading(false));
        }
    }

    // Update Plan progression
    const handleUpdateProg = (newNumCompletedTasks: number) => {
        const newProg: number = parseFloat((newNumCompletedTasks / (cards.length || 1)).toFixed(2));

        updatePlanMutation.mutate({
            weekProg: newProg,
        });

        // Update active plan
        dispatch(setActivePlan({ ...activePlan as Plan, weekProg: newProg }));

        // Update plan on array
        setPlans(prevPlans =>
            prevPlans.map((plan: Plan) =>
                plan._id === activePlan?._id ? { ...plan, weekProg: newProg } : plan
            )
        );
    }

    useEffect(() => {
        if (tasksData) {
            setCards(tasksData);
            dispatch(setNumTasks(tasksData.length));
        }
    }, [tasksData]);

    // Hide completed plans
    useEffect(() => {
        if (allPlansData) {
            setPlans(allPlansData.filter((plan: Plan) => plan.completed === false));
        }
    }, [allPlansData]);

    useEffect(() => {
        // Controls the section that appears when week end date is reached
        if (planData?.completed === true || isDateBeforeOrToday(planData?.weekEndDate)) {
            setShowCompletedSection(true);
        }
        else setShowCompletedSection(false);
    }, [planData]);

    if (plans.length < 1) return (<Empty />)

    if (isPendingPlan || isPendingTasks || isPendingPlans) return (<Loading />)

    if (errorPlan || errorTasks || errorPlans) return (<Error />)

    return (
        <div className="flex flex-col w-full gap-1">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row bg-white w-full px-6 rounded-sm">
                {/* Plan title and progress */}
                <div className="flex flex-col w-full lg:w-4/6 gap-4 lg:gap-8 py-4 sm:py-8">
                    <div className="flex flex-row gap-2">
                        <button onClick={togglePlansSelector} className="flex mt-2 shrink-0 transition hover:scale-110 duration-300">
                            <Image src={showPlansSelector ? ExpandUp : ExpandDown} alt="expand" />
                        </button>
                        <p className="text-2xl lg:text-3xl font-medium w-5/6">{planData.goal} - Week {planData.currWeek} / {planData.numWeeks}</p>
                    </div>
                    {showPlansSelector && <PlanSelector onSelect={handlePlanSelect} plans={plans} activePlanId={activePlanId || ""} />}
                    {!planData.completed && <ProgressBar prog={weekProg} />}
                </div>
                {/* Week end date and buttons */}
                {(daysUntilWeekEnd > 0 && !showCompletedSection) && (
                    <div className="flex flex-col justify-center items-center w-full lg:w-3/6 gap-4 mb-6 lg:mb-0">
                        <div className="flex flex-row lg:flex-col justify-center items-center gap-2">
                            <p className="text-auto lg:text-xl text-[#B3B3B3]">Week ends on:</p>
                            <p className="text-auto lg:text-xl">{planData.weekEndDate} ({daysUntilWeekEnd} {daysUntilWeekEnd > 1 ? 'days' : 'day'})</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <button
                                className="py-2 px-3 lg:py-4 lg:px-6 rounded-md bg-white border-primary border-[1px] drop-shadow-lg 
                        transition hover:scale-110 duration-300"
                                onClick={() => dispatch(setIsCreateTaskOpen(true))}
                            >
                                <p className="text-auto lg:text-lg text-primary">+ Add Task</p>
                            </button>
                            <button
                                className={`py-4 px-6 border-none rounded-md bg-primary drop-shadow-lg 
                        transition hover:scale-110 duration-300 ${(completedTasks !== cards.length) && "opacity-50"}`}
                                disabled={(completedTasks !== cards.length)}
                                onClick={() => handleNextWeekButton()}
                            >
                                <p className="text-auto sm:text-lg text-white">{(planData?.currWeek === planData?.numWeeks) ? "Complete Plan" : "Advance to next week"}</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Content section */}
            {showCompletedSection ? ( // If conditions met, show either "Week Completed" or "Plan Completed" section
                <>
                    {isPlanCompleted() ? ( // Plan Completed section
                        <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 min-h-[90vh] sm:h-5/6 rounded-sm">
                            <p className="text-2xl md:text-3xl font-medium">Congratulations!</p>
                            <p className="text-lg md:text-xl">You have completed all the tasks for this plan</p>
                            {/* Button to obtain Badge, if plan completes automatically */}
                            {!planData.completed && (
                                <button
                                    className="py-4 px-6 border-none rounded-md bg-primary drop-shadow-lg 
                                        transition hover:scale-110 duration-300"
                                    onClick={() => handleReceiveBadge()}
                                >
                                    <p className="text-auto sm:text-lg text-white">Receive Badge</p>
                                </button>
                            )}
                        </div>
                    ) : // Week Completed section
                        (
                            <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 min-h-[55vh] sm:h-5/6 rounded-sm">
                                <p className="text-2xl md:text-3xl font-medium">Moving to Week {(planData?.currWeek || 0) + 1}</p>
                                {planData?.currWeek === planData?.numWeeks && (
                                    <p className="text-lg md:text-xl text-[#B3B3B3] w-[400px] text-center">Extra Week to complete remaining tasks</p>
                                )}
                                <button
                                    className="py-4 px-6 border-none rounded-md bg-primary
                                        drop-shadow-lg transition hover:scale-110 duration-300"
                                    onClick={() => startNextWeek()}
                                >
                                    <p className="text-white text-lg md:text-xl">Continue</p>
                                </button>
                            </div>
                        )
                    }

                </>
            ) :
                (   // Else, show either Kanban or Activate sections
                    <>
                        {planData?.active && isDateBeforeOrToday(planData?.startDate) // if today >= start
                            ?    // Plan active and started
                            (
                                <Kanban cards={cards} setCards={setCards} updateFn={handleUpdateProg} completedTasks={completedTasks} />
                            )
                            :    // Plan paused or starts later
                            (
                                <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 min-h-[55vh] sm:h-5/6 rounded-sm">
                                    <p className="text-lg md:text-xl">{planData?.active ? "Plan starts on:" : "Plan Paused"}</p>
                                    {planData?.active && (<p className="text-2xl md:text-3xl font-medium">{planData?.startDate}</p>)}
                                    <button
                                        className="py-4 px-6 border-none rounded-md bg-primary
                                            drop-shadow-lg transition hover:scale-110 duration-300"
                                        onClick={() => startPlanEarly()}
                                    >
                                        <p className="text-white text-lg md:text-xl">{planData?.active ? "Start Now" : "Resume Plan"}</p>
                                    </button>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div >
    );
}
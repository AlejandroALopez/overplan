"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { IMoveTasksInput, IPlanInput, Plan, ITask, IBadgeInput } from "@/lib/types/planTypes";
import { updatePlan } from "@/lib/api/plansApi";
import { createBadge } from "@/lib/api/badgesApi";
import { setActivePlan } from "@/lib/store/planSlice";
import { setIsCreateTaskOpen } from "@/lib/store/modalSlice";
import { usePlanByPlanId, useTasksByPlanIdAndWeek, usePlansByUserId } from "@/hooks/queries";
import { isDateBeforeOrToday } from "@/lib/utils/dateFunctions";
import ExpandUp from "../../../../public/arrows/expandUp.svg";
import ExpandDown from "../../../../public/arrows/expandDown.svg";
import dayjs from "dayjs";
import { moveTasks } from "@/lib/api/tasksApi";
import {
    setIsConfirmOpen, setIsLoading, setMessage,
    setOnConfirm, setIsPlanCompletedOpen, setCompletedPlan
} from "@/lib/store/modalSlice";
import { Kanban } from "./kanban";
import { ProgressBar, PlanSelector } from './components';
import { setUserData } from "@/lib/store/sessionSlice";
import Loading from "./loading";
import Error from "./error";
import { User } from "@/lib/types/sessionTypes";


export default function Week() {
    const dispatch = useAppDispatch();
    const activePlanId = useAppSelector(state => state.session.userData?.activePlanId);
    const userData = useAppSelector(state => state.session.userData);
    const queryClient = useQueryClient();
    const today = dayjs();

    const { isPending: isPendingPlans, error: errorPlans, data: allPlansData } = usePlansByUserId(userData?.userId || "");
    const { isPending: isPendingPlan, error: errorPlan, data: planData } = usePlanByPlanId(activePlanId || "");
    const { isPending: isPendingTasks, error: errorTasks, data: tasksData } = useTasksByPlanIdAndWeek(planData?._id, planData?.currWeek);

    const [cards, setCards] = useState<ITask[]>([]);
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
            if(updatePlanMutation.data){
                dispatch(setActivePlan(updatePlanMutation.data));
            }
        }
    });

    const createBadgeMutation = useMutation({
        mutationFn: (badgeInput: IBadgeInput) => {
            return createBadge(badgeInput);
        },
        onError: () => {
            console.log('Error creating badge');
        },
    });

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
        return (planData?.numWeeks === planData?.currWeek) && (cards.length === completedTasks);
    }

    // Update week on Plan and move incomplete tasks
    const startNextWeek = async () => {
        dispatch(setIsLoading(true));

        try {
            // If past end date, new end date will be end + 7. Else, today + 7

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
        updatePlanMutation.mutate({
            completed: true,
        });

        // Create Badge
        const badgeBody: IBadgeInput = {
            goal: planData.goal,
            weeks: planData.numWeeks,
            userId: userData?.userId || "",
            planId: planData._id,
            imageKey: "blue",
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

        // TODO: Do something with the plan (hide?, change to another plan?)
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

    // Handle active plan selection from list
    const handlePlanSelect = async (selectedPlan: Plan) => {
        // Params: planId
        // Dispatch redux function ---> { ...user, activePlanId: planId }
        dispatch(setIsLoading(true));
        setShowPlansSelector(false);

        try {
            dispatch(setUserData({ ...userData as User, activePlanId: selectedPlan._id }));
            dispatch(setActivePlan(selectedPlan));

            await queryClient.invalidateQueries({ queryKey: ['plan', activePlanId] });
            await queryClient.refetchQueries({ queryKey: ['plan', activePlanId] });

            // Then invalidate the weekTasks query
            await queryClient.invalidateQueries({ queryKey: ['weekTasks', activePlanId] });

            dispatch(setIsLoading(false));
        } catch (error) {
            console.log('Error selecting plan', error);
        }
    }

    useEffect(() => {
        if (tasksData) setCards(tasksData);
    }, [tasksData]);

    useEffect(() => {
        updatePlanMutation.mutate({
            weekProg: weekProg,
        });
        // TODO: Update Plan on redux (active plan)
        // TODO: Update Plan located in Plans list on redux (plans)
    }, [weekProg]);

    useEffect(() => {
        // Controls the section that appears when week end date is reached
        if (isDateBeforeOrToday(planData?.weekEndDate)) setShowCompletedSection(true);
        else setShowCompletedSection(false);
    }, [planData])

    if (isPendingPlan || isPendingTasks || isPendingPlans) return (<Loading />)

    if (errorPlan || errorTasks || errorPlans) return (<Error />)

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row bg-white w-full h-2/6 px-6 rounded-sm">
                <div className="flex flex-col justify-center w-4/6 gap-8">
                    <div className="flex flex-row gap-4">
                        <p className="text-3xl font-medium">{planData.goal} - Week {planData.currWeek} / {planData.numWeeks}</p>
                        <button onClick={togglePlansSelector} className="shrink-0 transition hover:scale-110 duration-300">
                            <Image src={showPlansSelector ? ExpandUp : ExpandDown} alt="expand" />
                        </button>
                    </div>
                    {showPlansSelector && <PlanSelector onSelect={handlePlanSelect} plans={allPlansData} activePlanId={activePlanId || ""} />}
                    <ProgressBar prog={weekProg} />
                </div>
                {daysUntilWeekEnd > 0 && (
                    <div className="flex flex-col justify-center items-center w-3/6 gap-4">
                        <p className="text-xl text-[#B3B3B3]">Week ends on:</p>
                        <p className="text-xl">{planData.weekEndDate} ({daysUntilWeekEnd} {daysUntilWeekEnd > 1 ? 'days' : 'day'})</p>
                        <div className="flex flex-row gap-4">
                            <button
                                className="py-4 px-6 rounded-md bg-white border-primary border-[1px] text-primary text-lg drop-shadow-lg 
                        transition hover:scale-110 duration-300"
                                onClick={() => dispatch(setIsCreateTaskOpen(true))}
                            >
                                + Add Task
                            </button>
                            <button
                                className={`py-4 px-6 border-none rounded-md bg-primary text-white text-lg drop-shadow-lg 
                        transition hover:scale-110 duration-300 ${(completedTasks !== cards.length) && "opacity-50"}`}
                                disabled={(completedTasks !== cards.length)}
                                onClick={() => handleNextWeekButton()}
                            >
                                {(planData?.currWeek === planData?.numWeeks) ? "Complete Plan" : "Advance to next week"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showCompletedSection ? ( // If conditions met, show either "Week Completed" or "Plan Completed" section
                <>
                    {isPlanCompleted() ? ( // Plan Completed section
                        <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 h-5/6 rounded-sm">
                            <p className="text-3xl font-medium">Congratulations!</p>
                            <p className="text-xl">You have completed all the tasks for this plan</p>
                        </div>
                    ) : // Week Completed section
                        (
                            <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 h-5/6 rounded-sm">
                                <p className="text-3xl font-medium">Moving to Week {(planData?.currWeek || 0) + 1}</p>
                                {planData?.currWeek === planData?.numWeeks && (<p className="text-xl text-[#B3B3B3]">Extra Week to complete remaining tasks</p>)}
                                <button
                                    className="py-4 px-6 border-none rounded-md bg-primary
                            text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300"
                                    onClick={() => startNextWeek()}
                                >
                                    Continue
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
                                <Kanban cards={cards} setCards={setCards} />
                            )
                            :    // Plan paused or starts later
                            (
                                <div className="flex flex-col items-center justify-center gap-6 bg-white p-6 h-5/6 rounded-sm">
                                    <p className="text-xl">{planData?.active ? "Plan starts on:" : "Plan Paused"}</p>
                                    {planData?.active && (<p className="text-3xl font-medium">{planData?.startDate}</p>)}
                                    <button
                                        className="py-4 px-6 border-none rounded-md bg-primary
                            text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300"
                                        onClick={() => startPlanEarly()}
                                    >
                                        {planData?.active ? "Start Now" : "Resume Plan"}
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
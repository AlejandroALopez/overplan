"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { IMoveTasksInput, IPlanInput, Task } from "@/lib/types/planTypes";
import { updatePlan } from "@/lib/api/plansApi";
import { setPlan } from "@/lib/store/planSlice";
import { usePlanByPlanId, useTasksByPlanIdAndWeek } from "@/hooks/queries";
import { isDateBeforeOrToday } from "@/lib/utils/dateFunctions";
import ExpandUp from "../../../../public/arrows/expandUp.svg";
import ExpandDown from "../../../../public/arrows/expandDown.svg";
import dayjs from "dayjs";
import { moveTasks } from "@/lib/api/tasksApi";
import { setIsLoading } from "@/lib/store/modalSlice";
import { Kanban } from "./kanban";
import { ProgressBar, PlanSelector} from './components';


export default function Week() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const today = dayjs();
    const planId = "6633eb1735c48e147505a518"; // TODO: Store in redux

    const { isPending: isPendingPlan, error: errorPlan, data: planData } = usePlanByPlanId(planId);
    const { isPending: isPendingTasks, error: errorTasks, data: tasksData } = useTasksByPlanIdAndWeek(planData?._id, planData?.currWeek);

    const [cards, setCards] = useState<Task[]>([]);
    const [showPlansModal, setShowPlansModal] = useState<boolean>(false);
    const [showCompletedSection, setShowCompletedSection] = useState<boolean>(false);
    const completedTasks = cards.filter((c) => c.status === 'Completed').length;

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
            return updatePlan(planId, planInput);
        },
        onError: () => {
            console.log('Error updating plan');
            dispatch(setIsLoading(false));
        },
    });

    const togglePlansModal = () => {
        setShowPlansModal(!showPlansModal);
    };

    const startPlanEarly = () => {
        updatePlanMutation.mutate({
            startDate: dayjs(today).format('MM/DD/YYYY'),
            weekEndDate: dayjs(today).add(7, 'day').format('MM/DD/YYYY'),
            active: true,
        });
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
                weekEndDate: dayjs(planData.weekEndDate).add(7, 'day').format('MM/DD/YYYY'),
            });

            // Move incomplete tasks to next week
            await moveTasksMutation.mutateAsync({ planId: planData._id, week: planData.currWeek });

            // Invalidate and refetch the plan query first
            await queryClient.invalidateQueries({ queryKey: ['plan', planId] });
            await queryClient.refetchQueries({ queryKey: ['plan', planId] });

            // Then invalidate the weekTasks query
            await queryClient.invalidateQueries({ queryKey: ['weekTasks', planId] });

            dispatch(setIsLoading(false));
        } catch (error) {
            console.log('Error handling mutations', error);
        }
    }

    const completePlan = () => {
        updatePlanMutation.mutate({
            completed: true,
        });
    }

    if (updatePlanMutation.isSuccess) {
        dispatch(setPlan(updatePlanMutation.data));
    }

    useEffect(() => {
        if (tasksData) setCards(tasksData);
    }, [tasksData]);

    useEffect(() => {
        if (isDateBeforeOrToday(planData?.weekEndDate)) setShowCompletedSection(true);
        else setShowCompletedSection(false);
    }, [planData])

    if (isPendingPlan || isPendingTasks) return (<div>Loading...</div>)

    if (errorPlan) return (<div>An error has occurred: {errorPlan.message} </div>)
    if (errorTasks) return (<div>An error has occurred: {errorTasks.message} </div>)

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row bg-white w-full h-2/6 px-6 rounded-sm">
                <div className="flex flex-col justify-center w-4/6 gap-8">
                    <div className="flex flex-row gap-4">
                        <p className="text-3xl font-medium">{planData.goal} - Week {planData.currWeek} / {planData.numWeeks}</p>
                        <button onClick={togglePlansModal} className="shrink-0 transition hover:scale-110 duration-300">
                            <Image src={showPlansModal ? ExpandUp : ExpandDown} alt="expand" />
                        </button>
                    </div>
                    {showPlansModal && <PlanSelector />}
                    <ProgressBar prog={planData.weekProg} />
                </div>
                <div className="flex flex-col justify-center items-center w-2/6 gap-4">
                    <p className="text-xl text-[#B3B3B3]">Week ends on:</p>
                    <p className="text-xl">{planData.weekEndDate} (5 days)</p>
                </div>
            </div>
            {showCompletedSection ? ( // If conditions met, show "Week Completed" section
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
            ) :
                (   // Else, show either Kanban or Activate sections
                    <>
                        {planData?.active && isDateBeforeOrToday(planData?.startDate) // if today >= start
                            ?    // Plan active and started
                            (
                                <Kanban cards={cards} setCards={setCards}/>
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
        </div>
    );
}
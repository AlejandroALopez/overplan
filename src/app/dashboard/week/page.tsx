"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { ColumnProps, DropIndicatorProps, CardProps, HandleDragStartFunction, DragFunction, ColumnColorsType } from '@/lib/types/weekProps';
import { IMoveTasksInput, IPlanInput, Plan, Task } from "@/lib/types/planTypes";
import { updatePlan } from "@/lib/api/plansApi";
import { setPlan } from "@/lib/store/planSlice";
import { usePlanByPlanId, useTasksByPlanIdAndWeek } from "@/hooks/queries";
import { PlanProgressProps, SmallPlanProgressProps } from "@/lib/types/extraProps";
import { isDateBeforeOrToday } from "@/lib/utils/dateFunctions";
import ExpandUp from "../../../../public/arrows/expandUp.svg";
import ExpandDown from "../../../../public/arrows/expandDown.svg";
import dayjs from "dayjs";
import { moveTasks } from "@/lib/api/tasksApi";
import { setIsLoading } from "@/lib/store/modalSlice";

// Match column names with their respective colors
const column_text_colors: ColumnColorsType = {
    "Backlog": "text-taskBacklog",
    "Active": "text-taskActive",
    "In Progress": "text-taskInProgress",
    "Completed": "text-taskCompleted",
}

const column_bg_colors: ColumnColorsType = {
    "Backlog": "bg-taskBacklog",
    "Active": "bg-taskActive",
    "In Progress": "bg-taskInProgress",
    "Completed": "bg-taskCompleted",
}

const column_border_colors: ColumnColorsType = {
    "Backlog": "border-taskBacklog",
    "Active": "border-taskActive",
    "In Progress": "border-taskInProgress",
    "Completed": "border-taskCompleted",
}

const Column: React.FC<ColumnProps> = ({ column, cards, setCards }) => {
    const [active, setActive] = useState<boolean>(false);
    const filteredCards = cards.filter((c) => c.status === column);

    const handleDragStart: HandleDragStartFunction = (e, card) => {
        e.dataTransfer.setData("cardId", card._id);
    };

    const handleDragOver: DragFunction = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        ; setActive(true);
    }

    const highlightIndicator: DragFunction = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    // Get specific column for highlight
    const getIndicators = () => {
        return Array.from(document.querySelectorAll<HTMLElement>(`[data-column="${column}"]`));
    };

    const handleDragLeave: DragFunction = () => {
        setActive(false);
        clearHighlights();
    };

    const handleDragEnd: DragFunction = (e) => {
        setActive(false);
        clearHighlights();

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
        const before = element.dataset.before || "-1"; // card nearest to where we hover

        if (before !== cardId) { // if same card, don't do anything + double check
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c._id === cardId);
            if (!cardToTransfer) return;

            cardToTransfer = { ...cardToTransfer, status: column } // update status of card

            copy = copy.filter((c) => c._id !== cardId); // filter out that card (remove copy)

            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el._id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    }

    return (
        <div key={column} className="flex flex-col shrink-0 w-64 h-full text-center">
            <div className="flex flex-row items-center justify-between py-2">
                <p className={`text-xl ${column_text_colors[column]}`}>{column}</p>
                <p className={`text-xl ${column_text_colors[column]}`}>{filteredCards.length}</p>
            </div>
            <div
                className={`w-full h-full ${column_bg_colors[column]} bg-opacity-5 border-[1px] rounded-md p-2
                    ${column_border_colors[column]} ${active && "col-active opacity-50"} `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
            >
                {filteredCards.map((c) => <Card key={c._id} task={c} handleDragStart={handleDragStart} />)}
                <DropIndicator beforeId="-1" column={column} />
            </div>
        </div>
    )
}

const Card: React.FC<CardProps> = ({ task, handleDragStart }) => {

    // Help sync event types between React and Framer Motion
    const onDragStartHandler = (event: MouseEvent | TouchEvent | PointerEvent) => {
        if ((event.target as HTMLElement).getAttribute('draggable') === 'true') {
            handleDragStart(event as unknown as React.DragEvent<HTMLDivElement>, task);
        }
    };

    return (
        <>
            <DropIndicator beforeId={task._id} column={task.status} />
            <motion.div
                layout
                layoutId={task._id}
                className="flex flex-col text-left items-end bg-white border-2 border-[#EDEDED]
                    rounded-md rounded-br-xl cursor-grab active:cursor-grabbing"
                draggable="true"
                onDragStart={onDragStartHandler}
            >
                <p className="w-full p-2">{task.title}</p>
                <div className={`h-4 w-6 rounded-tl-md rounded-br-xl ${column_bg_colors[task.status]}`} />
            </motion.div>
        </>
    );
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
    return (
        <div
            className="my-0.5 h-0.5 w-full bg-primary opacity-0"
            data-before={beforeId || "-1"}
            data-column={column}
        />
    )
}

// Week Progress based on tasks completed
const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <div className="h-5 w-5/12 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="text-2xl">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

const SmallProgressBar: React.FC<SmallPlanProgressProps> = ({ prog, week }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row gap-2 items-center">
            <p className="w-10 text-lg">W{week}</p>
            <div className="h-4 w-36 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="w-10 text-lg">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

const PlanSelector: React.FC = () => {
    const plansData: Plan[] = [{
        slug: "write-an-essay-about-a-book",
        userId: "userId1",
        goal: "Write an essay about a book",
        numWeeks: 3,
        currWeek: 1,
        weekProg: 0,
        startDate: "2024-05-03",
        weekEndDate: "Friday, May 10",
        _id: "663558a7befb09cc3437dd50",
        active: true,
        completed: false,
    },
    {
        slug: "another-test-plan",
        userId: "userId1",
        goal: "Test plan",
        numWeeks: 4,
        currWeek: 2,
        weekProg: 0.5,
        startDate: "2024-05-03",
        weekEndDate: "Friday, May 10",
        _id: "admi23i023nn2i03dm23d",
        active: true,
        completed: false,
    }
    ];

    const selectPlan = () => {
        console.log("Change to this plan");
    }

    return (
        <div className="absolute z-10 w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-white border-2 border-[#E6E6E6] shadow-md px-4 py-2 mt-20 rounded-md">
            {plansData.map((plan: Plan) => (
                <button
                    key={plan._id}
                    onClick={() => selectPlan()}
                    className="flex flex-row items-center justify-between w-full border-b border-gray-200 px-1 py-1.5 rounded-md
                    cursor-pointer hover:bg-primary hover:bg-opacity-10 duration-300">
                    <p>{plan.goal}</p>
                    <SmallProgressBar prog={plan.weekProg} week={plan.currWeek} />
                </button>
            ))}
        </div>
    );
}

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
                                <div className="flex flex-row justify-between bg-white p-6 h-5/6 rounded-sm">
                                    <Column column={"Backlog"} cards={cards} setCards={setCards} />
                                    <Column column={"Active"} cards={cards} setCards={setCards} />
                                    <Column column={"In Progress"} cards={cards} setCards={setCards} />
                                    <Column column={"Completed"} cards={cards} setCards={setCards} />
                                </div>
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
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WeekProps, TaskProps } from "@/lib/types/plannerProps";
import { ColumnColorsType } from "@/lib/types/weekProps";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setIsSingleTaskOpen, setSelectedTask } from "@/lib/store/modalSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchTasksByPlanId } from "@/lib/api/tasksApi";
import { ITask } from "@/lib/types/planTypes";
import { RESULT_SUBTITLE } from "@/lib/constants/plannerConstants";
import ExpandPlus from "../../../../public/icons/expandPlus.svg";

import Loading from "./loading";
import Error from "./error";

const status_bg_colors: ColumnColorsType = {
    "Backlog": "bg-taskBacklog",
    "Today": "bg-taskToday",
    "In Progress": "bg-taskInProgress",
    "Completed": "bg-taskCompleted",
}

const Week: React.FC<WeekProps> = ({ week, activeWeek, setActiveWeek }) => {
    return (
        <button
            className={`px-6 py-4 rounded-lg bg-primary ${activeWeek === week ? "bg-opacity-100" : "bg-opacity-15"} 
            drop-shadow-lg transition hover:scale-110 duration-300`}
            onClick={() => { if (week !== activeWeek) setActiveWeek(week) }}
        >
            <p className={`text-xl ${activeWeek === week && "text-white"}`}>{week}</p>
        </button>
    );
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setSelectedTask(task));
        dispatch(setIsSingleTaskOpen(true));
    }

    return (
        <button
            className="flex flex-col text-left items-end bg-white border-2 border-[#EDEDED]
                rounded-md rounded-br-xl transition hover:scale-105 duration-300 hover:cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-full flex flex-row justify-between items-center">
                <Image className="ml-2" src={ExpandPlus} alt="expand icon" />
                <p className="w-full p-2">{task.title}</p>
            </div>
            <div className={`h-4 w-6 rounded-tl-md rounded-br-[10px] ${status_bg_colors[task.status]}`} />
        </button>
    );
}

export default function Result() {
    const activePlan = useAppSelector(state => state.plan.activePlan);
    const weeksArray: null[] = new Array(activePlan?.numWeeks).fill(null);

    const [activeWeek, setActiveWeek] = useState<number>(1);

    const { isPending, error, data: tasksData } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => fetchTasksByPlanId(activePlan?._id || ""),
        enabled: !!activePlan?._id
    })

    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        if (tasksData) setTasks(tasksData);
    }, [tasksData]);

    const filteredTasks = tasks?.filter((task: ITask) => task.week === activeWeek);

    if (error) return (<Error />)
    if (isPending) return (<Loading />)

    return (
        <main className="flex min-h-screen flex-col p-8">
            <div className="flex flex-col items-center gap-6 mt-4">
                <p className="text-[#808080] text-lg text-center">{RESULT_SUBTITLE}</p>
                <p className="text-2xl sm:text-3xl text-center font-semibold">{activePlan?.goal}</p>
                <p className="text-lg sm:text-xl">{activePlan?.numWeeks} weeks</p>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-4 px-4 mt-8">
                {weeksArray.map((_: null, index: number) => (
                    <Week key={index} week={index + 1} activeWeek={activeWeek} setActiveWeek={setActiveWeek} />
                ))}
            </div>
            <div className="flex flex-row flex-wrap gap-4 px-4 mt-8">
                {filteredTasks?.map((task: ITask) => (
                    <Task key={task._id} task={task} />
                ))}
            </div>
            <div className="mt-36 text-right">
                <Link href="/dashboard/week">
                    <button
                        className="py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300"
                    >
                        <p className="text-white text-xl">Start Plan</p>
                    </button>
                </Link>
            </div>
        </main >
    );
}
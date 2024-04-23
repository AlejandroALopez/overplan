"use client";

import Link from "next/link";
import { useState } from "react";
import { WeekProps, TaskProps } from "@/lib/types/plannerProps";
import { testPlan1 } from "@/lib/constants/testData";
import { ColumnColorsType } from "@/lib/types/weekProps";

const status_bg_colors: ColumnColorsType = {
    "Backlog": "bg-taskBacklog",
    "Active": "bg-taskActive",
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

const Task: React.FC<TaskProps> = ({task}) => {
    return (
        <div
            className="flex flex-col text-left items-end bg-white border-2 border-[#EDEDED]
                    rounded-md rounded-br-xl"
        >
            <p className="w-full p-2">{task.title}</p>
            <div className={`h-4 w-6 rounded-tl-md rounded-br-xl ${status_bg_colors[task.status]}`} />
        </div>
    );
}

export default function Goal() {
    const goal: string = testPlan1.goal;
    const numWeeks: number = testPlan1.numWeeks;
    const weeksArray: null[] = new Array(numWeeks).fill(null);

    const [activeWeek, setActiveWeek] = useState<number>(1);

    const filteredTasks = testPlan1.tasks.filter(task => task.week === activeWeek);

    const startPlan = () => {
        console.log("Start plan");
    }

    return (
        <main className="flex min-h-screen flex-col p-8">
            <div className="flex flex-col items-center gap-6 mt-4">
                <p className="text-[#808080] text-lg">Congrats! Here is an overview of your plan</p>
                <p className="text-3xl font-semibold">{goal}</p>
                <p className="text-xl">{numWeeks} weeks</p>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-8 px-4 mt-8">
                {weeksArray.map((_: null, index: number) => (
                    <Week key={index} week={index + 1} activeWeek={activeWeek} setActiveWeek={setActiveWeek} />
                ))}
            </div>
            <div className="flex flex-row flex-wrap gap-12 px-4 mt-8">
                {filteredTasks.map(task => (
                    <Task key={task.id} task={task}/>
                ))}
            </div>
            <div className="mt-36 text-right">
                <Link href="/dashboard/week">
                    <button
                        className="py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300"
                        onClick={() => startPlan()}
                    >
                        <p className="text-white text-xl">Start Plan</p>
                    </button>
                </Link>
            </div>
        </main >
    );
}
import Image from "next/image";
import Calendar from "../../../../../public/icons/smallCalendar.svg";
import Check from "../../../../../public/icons/smallCheck.svg";
import Bell from "../../../../../public/icons/smallBell.svg";

import { TopMetricsProps } from "@/lib/types/metricsProps";
import dayjs from "dayjs";
import { WeekProps, TaskProps, WeekSelectorProps } from "@/lib/types/plannerProps";
import { ColumnColorsType } from "@/lib/types/weekProps";
import { ITask } from "@/lib/types/planTypes";

export const TopMetrics: React.FC<TopMetricsProps> = ({ plan, tasks }) => {
    const today = dayjs().format('MM/DD/YYYY');
    const weekEndFormatted = dayjs(plan?.weekEndDate).format('dddd DD');

    const tasksCompletedToday = tasks.filter((c) => (c.status === 'Completed' && c.completionDate === today)).length;
    const tasksDue = tasks.filter((c) => c.status !== 'Completed').length;

    return (
        <div className="flex flex-row flex-wrap gap-4 md:gap-8 lg:gap-16 xl:gap-24">
            {/* Metric #1: Week */}
            <div className="flex flex-row items-center gap-4 w-60 py-4 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#FA9E9E] ml-4 p-2 md:p-3 rounded-lg">
                    <Image src={Calendar} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm md:text-base">Week {plan?.currWeek}</p>
                    <p className="text-[#B3B3B3] text-sm md:text-base">Out of {plan?.numWeeks} weeks</p>
                </div>
            </div>
            {/* Metric #2: Tasks completed today */}
            <div className="flex flex-row items-center gap-4 w-60 py-4 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#9EFA9E] ml-4 p-2 md:p-3 rounded-lg">
                    <Image src={Check} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm md:text-base">{tasksCompletedToday} {tasksCompletedToday === 1 ? "task" : "tasks"}</p>
                    <p className="text-[#B3B3B3] text-sm md:text-base">Completed today</p>
                </div>
            </div>
            {/* Metric #1: Tasks due */}
            <div className="flex flex-row items-center gap-4 w-60 py-4 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#AD9EFA] ml-4 p-2 md:p-3 rounded-lg">
                    <Image src={Bell} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm md:text-base">{tasksDue} {tasksDue === 1 ? "task" : "tasks"} due</p>
                    <p className="text-[#B3B3B3] text-sm md:text-base">By {weekEndFormatted}</p>
                </div>
            </div>
        </div>
    )
}

const status_bg_colors: ColumnColorsType = {
    "Backlog": "bg-taskBacklog",
    "Active": "bg-taskActive",
    "In Progress": "bg-taskInProgress",
    "Completed": "bg-taskCompleted",
}

const Week: React.FC<WeekProps> = ({ week, activeWeek, setActiveWeek }) => {
    return (
        <button
            className={`px-4 py-2 md:px-6 md:py-4 rounded-lg bg-primary ${activeWeek === week ? "bg-opacity-100" : "bg-opacity-15"} 
            drop-shadow-lg transition hover:scale-110 duration-300`}
            onClick={() => { if (week !== activeWeek) setActiveWeek(week) }}
        >
            <p className={`text-base md:text-xl ${activeWeek === week && "text-white"}`}>{week}</p>
        </button>
    );
}

const Task: React.FC<TaskProps> = ({ task }) => {
    return (
        <div
            className="flex flex-col text-left items-end bg-white border-2 border-[#EDEDED]
                    rounded-md rounded-br-xl"
        >
            <p className="text-sm md:text-base w-full p-2">{task.title}</p>
            <div className={`h-4 w-6 rounded-tl-md rounded-br-xl ${status_bg_colors[task.status]}`} />
        </div>
    );
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ weeksArray, activeWeek, setActiveWeek, filteredTasks }) => {
    return (
        <div className="flex flex-col gap-8 m-8">
            <div className="flex flex-col w-full gap-4">
                <p className="text-2xl font-medium">Tasks per week</p>
                <div className="flex flex-row flex-wrap gap-4">
                    {weeksArray.map((_: null, index: number) => (
                        <Week key={index} week={index + 1} activeWeek={activeWeek} setActiveWeek={setActiveWeek} />
                    ))}
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
                {filteredTasks?.map((task: ITask) => (
                    <Task key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}
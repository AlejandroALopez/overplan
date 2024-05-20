import Image from "next/image";
import Calendar from "../../../../../public/icons/smallCalendar.svg";
import Check from "../../../../../public/icons/smallCheck.svg";
import Bell from "../../../../../public/icons/smallBell.svg";

import { TopMetricsProps } from "@/lib/types/metricsProps";
import dayjs from "dayjs";

export const TopMetrics: React.FC<TopMetricsProps> = ({ plan, tasks }) => {
    const today = dayjs().format('MM/DD/YYYY');
    const weekEndFormatted = dayjs(plan?.weekEndDate).format('dddd DD');

    const tasksCompletedToday = tasks.filter((c) => (c.status === 'Completed' && c.completionDate === today)).length;
    const tasksDue = tasks.filter((c) => c.status !== 'Completed').length;

    return (
        <div className="flex flex-row gap-24">
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#FA9E9E] p-3 rounded-lg">
                    <Image src={Calendar} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">Week {plan?.currWeek}</p>
                    <p className="text-[#B3B3B3]">Out of {plan?.numWeeks} weeks</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#9EFA9E] p-3 rounded-lg">
                    <Image src={Check} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">{tasksCompletedToday} {tasksCompletedToday === 1 ? "task" : "tasks"}</p>
                    <p className="text-[#B3B3B3]">Completed today</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#AD9EFA] p-3 rounded-lg">
                    <Image src={Bell} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">{tasksDue} {tasksDue === 1 ? "task" : "tasks"} due</p>
                    <p className="text-[#B3B3B3]">By {weekEndFormatted}</p>
                </div>
            </div>
        </div>
    )
}
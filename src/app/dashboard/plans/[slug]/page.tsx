"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/store";
import { TopMetrics, WeekSelector } from "./components";
import { useAllTasks } from "@/hooks/queries";
import { useEffect, useState } from "react";
import { Plan, Task } from "@/lib/types/planTypes";
import { OverallSummaryChart, WeekSummaryChart } from "./charts";


export default function SinglePlan() {
    const selectedPlan: Plan | null = useAppSelector(state => state.plan.metricsPlan);
    const [tasks, setTasks] = useState<Task[]>([]);

    const { isPending: isPendingTasks, error: errorTasks, data: tasksData } = useAllTasks(selectedPlan?._id || "");
    const weekTasks = tasks.filter((t) => t.week === selectedPlan?.currWeek);

    // Week Selector params
    const [activeWeek, setActiveWeek] = useState<number>(selectedPlan?.currWeek || 1);
    const weeksArray: null[] = new Array(selectedPlan?.numWeeks).fill(null);
    const filteredTasks = tasks.filter((t) => t.week === activeWeek);

    useEffect(() => {
        if (tasksData) setTasks(tasksData);
    }, [tasksData]);

    if (isPendingTasks) return (<div>Loading...</div>);

    if (errorTasks) return (<div>An error has occurred: {errorTasks.message} </div>);

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex flex-col bg-white gap-8 p-8">
                <div className="flex flex-row text-3xl gap-1">
                    <Link href="/dashboard/plans" className="text-gray-400 underline">My Plans/</Link>
                    <span className="font-medium">{selectedPlan?.goal}</span>
                </div>
                <TopMetrics plan={selectedPlan} tasks={weekTasks} />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="bg-white w-full p-6">
                    <p className="text-2xl font-medium mb-4">Week Summary</p>
                    <WeekSummaryChart tasks={weekTasks} />
                </div>
                <div className="w-2 h-full" />
                <div className="bg-white w-full p-6">
                    <p className="text-2xl font-medium mb-4">Overall Summary</p>
                    <OverallSummaryChart tasks={tasks} currWeek={selectedPlan?.currWeek || 1} />
                </div>
            </div>
            <div className="bg-white w-full h-48">
                <WeekSelector 
                    weeksArray={weeksArray} 
                    activeWeek={activeWeek}
                    setActiveWeek={setActiveWeek}
                    filteredTasks={filteredTasks}
                />
            </div>
        </div>
    );
}
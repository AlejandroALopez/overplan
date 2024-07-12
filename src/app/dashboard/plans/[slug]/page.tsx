"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/store";
import { TopMetrics, WeekSelector } from "./components";
import { useAllTasks } from "@/hooks/queries";
import { useEffect, useState } from "react";
import { Plan, ITask } from "@/lib/types/planTypes";
import { OverallSummaryChart, WeekSummaryChart } from "./charts";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../loading";
import Error from "../error";

export default function SinglePlan() {
    const queryClient = useQueryClient();
    const selectedPlan: Plan | null = useAppSelector(state => state.plan.metricsPlan);
    const [tasks, setTasks] = useState<ITask[]>([]);

    const { isPending: isPendingTasks, error: errorTasks, data: tasksData, isSuccess } = useAllTasks(selectedPlan?._id || "");
    const weekTasks = tasks.filter((t) => t.week === selectedPlan?.currWeek);

    // Week Selector params
    const [activeWeek, setActiveWeek] = useState<number>(selectedPlan?.currWeek || 1);
    const weeksArray: null[] = new Array(selectedPlan?.numWeeks).fill(null);
    const filteredTasks = tasks.filter((t) => t.week === activeWeek);

    useEffect(() => {
        if (tasksData) setTasks(tasksData);
    }, [tasksData]);

    if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['metricsTasks'] });
    }

    if (isPendingTasks) return (<Loading />);

    if (errorTasks) return (<Error />);

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex flex-col bg-white gap-8 p-8">
                {/* Title */}
                <p className="text-xl md:text-2xl lg:text-3xl w-full">
                    <Link href="/dashboard/plans" className="text-gray-400 underline">My Plans/</Link>
                    {" "}
                    <span className="font-medium">{selectedPlan?.goal}</span>
                </p>
                {/* Top Metrics */}
                <TopMetrics plan={selectedPlan} tasks={weekTasks} />
            </div>
            {/* Metrics*/}
            <div className="flex flex-col xl:flex-row justify-between w-full">
                <div className="bg-white w-full p-6">
                    <p className="text-2xl font-medium mb-4">Week Summary</p>
                    <WeekSummaryChart tasks={weekTasks} />
                </div>
                <div className="h-1 w-full xl:w-2 xl:h-full" />
                <div className="bg-white w-full p-6">
                    <p className="text-2xl font-medium mb-4">Overall Summary</p>
                    <OverallSummaryChart tasks={tasks} currWeek={selectedPlan?.currWeek || 1} />
                </div>
            </div>
            {/* Week Selector */}
            <div className="bg-white w-full">
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
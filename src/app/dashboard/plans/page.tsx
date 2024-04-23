"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { plansData, PlanProgressProps } from "@/lib/constants/testPlans";

// Week Progress based on tasks completed
const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {

    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row justify-center items-center gap-4">
            <div className="h-3 w-5/12 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p>{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

export default function MyPlans() {
    const router = useRouter();
    const [currentPlan, setCurrentPlan] = useState<string>(""); // TODO: Replace with redux

    const handleRowClick = (id: string, slug: string) => {
        // TODO: Add Loading
        // TODO: API --> GET plan by id, send to redux
        router.push(`/dashboard/plans/${encodeURIComponent(slug)}`);
    };

    return (
        <div className="flex flex-col w-full bg-white gap-12 p-8">
            <div className="flex flex-row justify-between w-full">
                <p className="text-3xl font-medium">My Plans</p>
                <Link href="/planner/goal" className={`py-4 px-6 mr-8 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}>
                    Create Plan
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-gray-400 text-xl font-normal border-b border-gray-200 px-4 py-2">Goal</th>
                            <th className="text-gray-400 text-xl font-normal border-b border-gray-200 px-4 py-2">Week</th>
                            <th className="text-gray-400 text-xl font-normal border-b border-gray-200 px-4 py-2">Week Progress</th>
                            <th className="text-gray-400 text-xl font-normal border-b border-gray-200 px-4 py-2">Week ends on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plansData.map((plan) => (
                            <tr 
                                key={plan.id} 
                                className="cursor-pointer hover:bg-primary hover:bg-opacity-10 duration-300"
                                onClick={() => handleRowClick(plan.id, plan.slug)}
                            >
                                <td className="text-center border-b border-gray-200 p-4">{plan.goal}</td>
                                <td className="text-center border-b border-gray-200 p-4">{plan.currWeek} of {plan.numWeeks}</td>
                                <td className="text-center border-b border-gray-200 p-4"><ProgressBar prog={plan.weekProg} /></td>
                                <td className="text-center border-b border-gray-200 p-4">{plan.weekEndDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
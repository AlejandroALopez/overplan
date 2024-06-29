"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PlanProgressProps } from "@/lib/types/extraProps";
import { Plan } from "@/lib/types/planTypes";
import { usePlansByUserId } from "@/hooks/queries";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setMetricsPlan } from "@/lib/store/planSlice";
import Loading from "./loading";
import Error from "./error";

// Week Progress based on tasks completed
const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {

    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4">
            <div className="h-3 w-full md:w-5/12 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p>{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

export default function MyPlans() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [plans, setPlans] = useState<Plan[]>([]);
    const userData = useAppSelector(state => state.session.userData);

    const { isPending, error, data: plansData } = usePlansByUserId(userData?.userId || "");

    const handleRowClick = (plan: Plan) => {
        // TODO: Add Loading
        dispatch(setMetricsPlan(plan));
        router.push(`/dashboard/plans/${encodeURIComponent(plan.slug)}`);
    };

    useEffect(() => {
        if (plansData) setPlans(plansData);
    }, [plansData]);

    if (isPending) return (<Loading />)

    if (error) return (<Error />)

    return (
        <div className="flex flex-col bg-white gap-12 p-8 w-full">
            {/* Headings */}
            <div className="flex flex-row items-center justify-between w-full">
                <p className="text-3xl font-medium">My Plans</p>
                <Link href="/planner/goal" className="py-4 px-6 lg:mr-8 border-none rounded-md bg-primary
                    drop-shadow-lg transition hover:scale-110 duration-300">
                    <p className="text-xl text-white">Create Plan</p>
                </Link>
            </div>
            <div className="overflow-x-scroll lg:overflow-x-auto">
                <table className="table-auto min-w-[600px] lg:w-full">
                    <thead>
                        <tr>
                            <th className="text-gray-400 md:text-xl font-normal border-b border-gray-200 px-4 py-2">Goal</th>
                            <th className="text-gray-400 md:text-xl font-normal border-b border-gray-200 px-4 py-2">Week</th>
                            <th className="text-gray-400 md:text-xl font-normal border-b border-gray-200 px-4 py-2">Week Progress</th>
                            <th className="text-gray-400 md:text-xl font-normal border-b border-gray-200 px-4 py-2">Week ends on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan: Plan) => (
                            <tr
                                key={plan._id}
                                className="cursor-pointer hover:bg-primary hover:bg-opacity-10 duration-300"
                                onClick={() => handleRowClick(plan)}
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
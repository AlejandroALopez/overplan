"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PlanProgressProps } from "@/lib/types/extraProps";
import { Plan } from "@/lib/types/planTypes";
import { usePlansByUserId } from "@/hooks/queries";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setMetricsPlan } from "@/lib/store/planSlice";
import { setIsNoTokensOpen } from "@/lib/store/modalSlice";
import { useQueryClient } from "@tanstack/react-query";

import Zap from "../../../../public/icons/zap.svg";
import Loading from "./loading";
import Error from "./error";


// Week Progress based on tasks completed
const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {

    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4">
            <div className="h-3 w-24 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="w-12">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

export default function MyPlans() {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    const queryClient = useQueryClient();

    const [isArchiveMode, setIsArchiveMode] = useState<boolean>(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [archivedPlans, setArchivedPlans] = useState<Plan[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const plansPerPage: number = 4;
    const totalPages: number = Math.ceil(plans.length / plansPerPage);
    const totalPagesArchived: number = Math.ceil(archivedPlans.length / plansPerPage);

    // Slicing Plans array for pages
    const startIndex = (currentPage - 1) * plansPerPage;
    const currentPlans = plans.slice(startIndex, startIndex + plansPerPage);
    const currentPlansArchived = archivedPlans.slice(startIndex, startIndex + plansPerPage);

    const userData = useAppSelector(state => state.session.userData);
    const { isPending, error, data: plansData, isSuccess } = usePlansByUserId(userData?.userId || "");

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, (isArchiveMode ? totalPagesArchived : totalPages)));
    };

    const handleRowClick = (plan: Plan) => {
        dispatch(setMetricsPlan(plan));
        router.push(`/dashboard/plans/${encodeURIComponent(plan.slug)}`);
    };

    // If enough tokens, redirect to planner. Else, display modal
    const handleCreatePlan = () => {
        if (userData?.tokens && userData?.tokens > 0) {
            router.push("/planner/goal");
        } else {
            dispatch(setIsNoTokensOpen(true));
        }
    }

    // Swap to archived plans, or back to active plans
    const toggleArchived = () => {
        setIsArchiveMode(!isArchiveMode);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (plansData) {
            setPlans(plansData.filter((plan: Plan) => plan.completed === false));
            setArchivedPlans(plansData.filter((plan: Plan) => plan.completed === true))
        }
    }, [plansData]);

    if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['plans'] });
    }

    if (isPending) return (<Loading />)

    if (error) return (<Error />)

    return (
        <div className="flex flex-col bg-white gap-12 p-8 w-full min-h-screen">
            {/* Headings */}
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-2xl md:text-3xl font-medium">{isArchiveMode ? "My Completed Plans" : "My Plans"}</p>
                    <button
                        onClick={() => toggleArchived()}
                    >
                        <p
                            className="text-primary text-center transition hover:scale-105 duration-300"
                        >
                            See {isArchiveMode ? "active" : "completed"} plans
                        </p>
                    </button>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row items-center justify-center px-4 h-16 gap-3 border-2 border-[#B3B3B3] rounded-2xl">
                        <Image src={Zap} alt="zap icon" />
                        <p className="text-xl font-medium text-center">{userData?.tokens}</p>
                    </div>
                    <button
                        onClick={handleCreatePlan}
                        className="px-6 lg:mr-8 h-16 border-none rounded-md bg-primary
                            drop-shadow-lg transition hover:scale-110 duration-300"
                    >
                        <p className="text-lg sm:text-xl text-white">Create Plan</p>
                    </button>
                </div>
            </div>
            {/* Plans Table */}
            <div className="overflow-x-scroll lg:overflow-x-auto h-3/4 lg:h-1/2">
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
                        {(isArchiveMode ? currentPlansArchived : currentPlans).map((plan: Plan) => (
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
            {/* Page Selector */}
            {totalPages > 0 && (
                <div className="flex flex-row items-center justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <p className="text-white">&lt;</p>
                    </button>
                    <span className="text-center w-24">Page {currentPage} of {(isArchiveMode ? totalPagesArchived : totalPages)}</span>
                    <button
                        className="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        onClick={handleNextPage}
                        disabled={currentPage === (isArchiveMode ? totalPagesArchived : totalPages)}
                    >
                        <p className="text-white">&gt;</p>
                    </button>
                </div>
            )}
        </div>
    );
}
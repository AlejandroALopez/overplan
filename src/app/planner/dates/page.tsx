"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import PlannerProgressBar from "@/components/plannerProgressBar";

export default function SetDates() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);

    const question = "When do you want to start?";

    const submitDate = () => {
        console.log("TODO");
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <PlannerProgressBar step={3} />
            <p className="text-2xl mt-12">
                Goal: <span className="font-semibold">{goal}</span>
            </p>
            <p className="text-2xl mt-8">{weeks} weeks</p>
            <p className="text-3xl font-semibold mt-8">{question}</p>
            <div className="flex justify-center items-center mt-8 w-1/2 h-64 bg-slate-400">
                TODO: Add calendar
            </div>
            <div className="flex flex-row justify-between my-16 w-1/2">
                <Link href="/planner/weeks">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                    >
                        &lt; Back
                    </button>
                </Link>
                <Link href="/planner/review">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                        onClick={() => submitDate()}
                    >
                        Next &gt;
                    </button>
                </Link>
            </div>
        </main>
    );
}

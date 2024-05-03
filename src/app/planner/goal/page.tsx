"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setGoal } from "@/lib/store/inputSlice";
import { GOAL_QUESTION, GOAL_PLACEHOLDER } from "@/lib/constants/plannerConstants";

export default function Goal() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const [selectedGoal, setSelectedGoal] = useState<string>("");

    const submitGoal = () => {
        dispatch(setGoal(selectedGoal));
    }

    useEffect(() => {
        if (goal !== "") setSelectedGoal(goal);
    }, [goal]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <p className="text-2xl sm:text-3xl text-center mt-16">Let&apos;s build the best plan for you</p>
            <p className="text-2xl sm:text-3xl text-center font-semibold mt-16">{GOAL_QUESTION}</p>
            <input
                className="w-3/4 md:w-2/4 mt-16 p-8 border-[#808080] border-[1px] rounded-xl bg-[#A6A6A6] bg-opacity-25 text-lg md:text-xl"
                placeholder={GOAL_PLACEHOLDER}
                value={selectedGoal}
                onChange={e => setSelectedGoal(e.target.value)}
            />
            <div className="flex flex-row justify-between my-16 w-full lg:w-1/2">
                <Link href="/">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                    >
                        &lt; Back
                    </button>
                </Link>
                <Link href="/planner/weeks">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300
                        ${selectedGoal === "" && "opacity-50"}`}
                        disabled={selectedGoal === ""}
                        onClick={() => submitGoal()}
                    >
                        Next &gt;
                    </button>
                </Link>
            </div>
        </main>
    )
}
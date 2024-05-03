"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { WeekOptionProps } from "@/lib/types/plannerProps";
import { setNumWeeks } from "@/lib/store/inputSlice";
import { WEEK_QUESTION, DEFAULT_WEEKS, MIN_WEEKS, MAX_WEEKS } from "@/lib/constants/plannerConstants";

const WeekSelector: React.FC<WeekOptionProps> = ({ weeks, setWeeks }) => {

    return (
        <div className="flex flex-col my-12">
            <div className="flex flex-row items-center sm:gap-4 my-8">
                <button
                    className={`bg-[#A6A6A6] w-20 h-20 sm:w-24 sm:h-24 rounded-2xl drop-shadow-xl 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks >= MIN_WEEKS + 1 ? "bg-opacity-40" : "bg-opacity-10"}`}
                    onClick={() => (weeks >= MIN_WEEKS + 1) ? setWeeks(weeks - 1) : null}
                >
                    <p className="text-5xl sm:text-6xl">-</p>
                </button>
                <div className="flex items-center justify-center w-32 h-16 rounded-2xl border-none">
                    <p className="text-4xl sm:text-5xl">{weeks}</p>
                </div>
                <button
                    className={`bg-[#A6A6A6] w-20 h-20 sm:w-24 sm:h-24 rounded-2xl drop-shadow-xl 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks <= MAX_WEEKS - 1 ? "bg-opacity-40" : "bg-opacity-10"}`}
                    onClick={() => (weeks <= MAX_WEEKS - 1) ? setWeeks(weeks + 1) : null}
                >
                    <p className="text-5xl sm:text-6xl">+</p>
                </button>
            </div>
        </div>
    )
}

export default function SetWeeks() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const [weeks, setWeeks] = useState<number>(DEFAULT_WEEKS);

    const submitWeeks = () => {
        dispatch(setNumWeeks(weeks));
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <p className="text-xl sm:text-2xl text-center mt-8">
                Goal: <span className="font-semibold">{goal}</span>
            </p>
            <p className="text-2xl sm:text-3xl text-center font-semibold mt-16">{WEEK_QUESTION}</p>
            <WeekSelector weeks={weeks} setWeeks={setWeeks} />
            <div className="flex flex-row justify-between my-16 w-full lg:w-1/2">
                <Link href="/planner/goal">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                    >
                        &lt; Back
                    </button>
                </Link>
                <Link href="/planner/dates">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                        onClick={() => submitWeeks()}
                    >
                        Next &gt;
                    </button>
                </Link>
            </div>
        </main>
    );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { WeekOptionProps } from "@/lib/types/plannerProps";
import { setNumWeeks } from "@/lib/store/inputSlice";

const WeekSelector: React.FC<WeekOptionProps> = ({ weeks, setWeeks }) => {
    const title = "In how many weeks do you wish to complete it?";
    const MIN_VALUE = 1;
    const MAX_VALUE = 20;

    return (
        <div className="flex flex-col my-12">
            <p className="text-2xl font-bold">{title}</p>
            <div className="flex flex-row items-center gap-4 my-8">
                <button 
                    className={`px-6 py-4 rounded-2xl drop-shadow-md 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks >= MIN_VALUE ? "bg-gray-400" : "bg-gray-300"}`}
                    onClick={() => (weeks >= MIN_VALUE) ? setWeeks(weeks - 1) : null}
                >
                    <p className="text-3xl">-</p>
                </button>
                <div className="flex items-center justify-center w-32 h-16 rounded-2xl border-2 border-solid border-gray-400">
                    <p className="text-3xl">{weeks}</p>
                </div>
                <button 
                    className={`bg-gray-400 px-6 py-4 rounded-2xl drop-shadow-md 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks <= MAX_VALUE - 1 ? "bg-gray-400" : "bg-gray-300"}`}
                    onClick={() => (weeks <= MAX_VALUE - 1) ? setWeeks(weeks + 1) : null}
                >
                    <p className="text-3xl">+</p>
                </button>
            </div>
        </div>
    )
}

export default function SetWeeks() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const [weeks, setWeeks] = useState<number>(0);

    const submitTime = () => {
        console.log("# weeks: ", weeks);
        dispatch(setNumWeeks(weeks));
        // TODO: API call to create plan
    }

    return (
        <main className="flex min-h-screen flex-col p-8 bg-[#f5f5f5]">
            <p className="text-gray-500 text-xl">
                Goal: <span className="text-[#a52a2a] font-bold">{goal}</span>
            </p>
            <WeekSelector weeks={weeks} setWeeks={setWeeks} />
            <div className="mx-8 text-right">
                <Link href="/planner/result">
                    <button
                        className={`w-20 h-20 p-4 border-none rounded-2xl bg-[#4d4d4d] 
                            drop-shadow-md transition hover:scale-110 duration-300 cursor-pointer
                            ${weeks === 0 && "opacity-50"}`}
                        disabled={weeks === 0}
                        onClick={() => submitTime()}
                    >
                        <p className="text-xl text-white">&gt;</p>
                    </button>
                </Link>
            </div>
        </main>
    );
}

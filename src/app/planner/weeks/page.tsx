"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { WeekOptionProps } from "@/lib/types/plannerProps";
import { setNumWeeks } from "@/lib/store/inputSlice";

const WeekSelector: React.FC<WeekOptionProps> = ({ weeks, setWeeks }) => {
    const MIN_VALUE = 1;
    const MAX_VALUE = 20;

    return (
        <div className="flex flex-col my-12">
            <div className="flex flex-row items-center gap-4 my-8">
                <button
                    className={`bg-[#A6A6A6] w-24 h-24 rounded-2xl drop-shadow-xl 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks >= MIN_VALUE + 1 ? "bg-opacity-40" : "bg-opacity-10"}`}
                    onClick={() => (weeks >= MIN_VALUE + 1) ? setWeeks(weeks - 1) : null}
                >
                    <p className="text-6xl">-</p>
                </button>
                <div className="flex items-center justify-center w-32 h-16 rounded-2xl border-none">
                    <p className="text-5xl">{weeks}</p>
                </div>
                <button
                    className={`bg-[#A6A6A6] w-24 h-24 rounded-2xl drop-shadow-xl 
                    transition hover:scale-110 duration-300 cursor-pointer
                    ${weeks <= MAX_VALUE - 1 ? "bg-opacity-40" : "bg-opacity-10"}`}
                    onClick={() => (weeks <= MAX_VALUE - 1) ? setWeeks(weeks + 1) : null}
                >
                    <p className="text-6xl">+</p>
                </button>
            </div>
        </div>
    )
}

export default function SetWeeks() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const question = "In how many weeks do you want to achieve this goal?";
    const [weeks, setWeeks] = useState<number>(4);

    const submitWeeks = () => {
        dispatch(setNumWeeks(weeks));
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="h-4 w-1/4 bg-primary bg-opacity-25 rounded-3xl">
                <div className={`h-4 w-2/4 bg-primary rounded-3xl`} />
            </div>
            <p className="text-2xl mt-12">
                Goal: <span className="font-semibold">{goal}</span>
            </p>
            <p className="text-3xl font-semibold mt-16">{question}</p>
            <WeekSelector weeks={weeks} setWeeks={setWeeks} />
            <div className="flex flex-row justify-between my-16 w-1/2">
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

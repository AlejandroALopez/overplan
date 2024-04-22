"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoalIdeaProps } from "@/lib/types/plannerProps";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setGoal } from "@/lib/store/inputSlice";

// Goal Suggestion Item
const GoalIdea: React.FC<GoalIdeaProps> = ({ idea, setSelectedGoal }) => {
    return (
        <button
            className="flex justify-center w-64 h-24 p-8 my-4 border-none rounded-2xl 
                bg-[#666666] items-center cursor-pointer drop-shadow-md
                transition hover:scale-110 duration-300"
            onClick={() => setSelectedGoal(idea)}
        >
            <p className="text-white text-lg">{idea}</p>
        </button>
    );
}

export default function Goal() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const question = "What goal do you want to achieve?";
    const placeholder_text = "Run 5 miles/day, eat healthier, etc.";

    const [selectedGoal, setSelectedGoal] = useState<string>("");

    const submitGoal = () => {
        dispatch(setGoal(selectedGoal));
    }

    useEffect(() => {
        if (goal !== "") setSelectedGoal(goal);
    }, [goal]);

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <div className="h-4 w-1/4 bg-primary bg-opacity-25 rounded-3xl">
                <div className={`h-4 w-1/4 bg-primary rounded-3xl`} />
            </div>
            <p className="text-3xl mt-20">Let&apos;s build the best plan for you</p>
            <p className="text-3xl font-semibold mt-16">{question}</p>
            <input
                className="w-3/6 mt-16 p-8 border-[#808080] border-[1px] rounded-xl bg-[#A6A6A6] bg-opacity-25 text-2xl"
                placeholder={placeholder_text}
                value={selectedGoal}
                onChange={e => setSelectedGoal(e.target.value)}
            />
            <div className="flex flex-row justify-between my-16 w-1/2">
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
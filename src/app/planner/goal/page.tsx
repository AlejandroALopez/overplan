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

    const question = "What is your goal?";
    const placeholder_text = "Run 5 miles/day, eat healthier, etc.";
    const ideas = ["Run 5 miles/day", "Learn Python", "Analyze a scientific paper", "Plan a date",
        "Lose 10 pounds", "Get better sleep"];

    const [selectedGoal, setSelectedGoal] = useState<string>("");

    const submitGoal = () => {
        dispatch(setGoal(selectedGoal));
    }

    useEffect(() => {
        if (goal !== "") setSelectedGoal(goal);
    }, [goal]);

    return (
        <main className="flex min-h-screen flex-col p-8 bg-[#f5f5f5]">
            <p className="text-2xl font-bold mt-20">{question}</p>
            <div className="flex flex-row items-center gap-16 my-16">
                <input
                    className="w-3/6 h-20 p-4 border-none rounded-2xl bg-[#cccccc] text-xl"
                    placeholder={placeholder_text}
                    value={selectedGoal}
                    onChange={e => setSelectedGoal(e.target.value)}
                />
                <Link href="/planner/weeks">
                    <button
                        className={`w-20 h-20 p-4 border-none rounded-2xl bg-[#4d4d4d] 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300
                        ${selectedGoal === "" && "opacity-50"}`}
                        disabled={selectedGoal === ""}
                        onClick={() => submitGoal()}
                    >
                        &gt;
                    </button>
                </Link>
            </div>
            <p className="text-xl font-medium">Goal ideas</p>
            <div className="flex flex-row flex-wrap gap-x-16">
                {ideas.map((idea, index) => (
                    <GoalIdea key={index} idea={idea} index={index} setSelectedGoal={setSelectedGoal} />
                )
                )}
            </div>
        </main>
    )
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { WeekOptionProps } from "@/lib/types/plannerProps";
import { setNumWeeks } from "@/lib/store/inputSlice";

const WeekOption: React.FC<WeekOptionProps> = ({ option, selectedTime, setSelectedTime }) => {
    return (
        <button
            className={`w-3/6 p-8 border-none rounded-2xl drop-shadow-md
                transition hover:scale-110 duration-300
                ${selectedTime === option ? "bg-[#4d4d4d]" : "bg-[#afafaf]"}`}
            onClick={() => setSelectedTime(option)}
        >
            <p className="text-xl text-white">{option}</p>
        </button>
    )
}

export default function SetWeeks() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);

    const question = "In how many weeks do you wish to complete it?";
    const options = [2, 4, 6]; // suggested number of weeks

    const [selectedTime, setSelectedTime] = useState<number>(0);

    const submitTime = () => {
        console.log("# weeks: ", selectedTime);
        dispatch(setNumWeeks(selectedTime));
        // TODO: API call to create plan
    }

    return (
        <main className="flex min-h-screen flex-col p-8 bg-[#f5f5f5]">
            <p className="text-gray-500 text-xl">
                Goal: <span className="text-[#a52a2a] font-bold">{goal}</span>
            </p>
            <p className="text-2xl font-bold">{question}</p>
            <div className="flex flex-col gap-8 my-16 mx-8 w-2/6">
                {options.map((opt: number, index: number) => (
                    <WeekOption key={index} option={opt} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                ))}
            </div>
            <div className="mx-8 text-right">
                <Link href="/planner/result">
                    <button
                        className={`w-20 h-20 p-4 border-none rounded-2xl bg-[#4d4d4d] 
                            drop-shadow-md transition hover:scale-110 duration-300 cursor-pointer
                            ${selectedTime === 0 && "opacity-50"}`}
                        disabled={selectedTime === 0}
                        onClick={() => submitTime()}
                    >
                        <p className="text-xl text-white">&gt;</p>
                    </button>
                </Link>
            </div>
        </main>
    );
}

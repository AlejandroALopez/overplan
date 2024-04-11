"use client";

import Link from "next/link";
import Image from 'next/image';
import { useState } from "react";
import { WeekProps, TaskProps } from "@/lib/types/plannerProps";
import { testWeeks, testPlan1 } from "@/lib/constants/testData";
import expandDown from "../../../../public/arrows/expandDown.svg";
import expandUp from "../../../../public/arrows/expandUp.svg";
import bulletPoint from "../../../../public/shapes/bulletPoint.svg";


const Week: React.FC<WeekProps> = ({ week, activeWeek, setActiveWeek }) => {
    return (
        <div>
            <div className="flex items-center justify-between w-11/12 h-12 py-10 px-8 rounded-2xl bg-[#bfbfbf]">
                <p className="text-lg">Week {week}</p>
                <button
                    className="border-none bg-none"
                    onClick={() => (week === activeWeek) ? setActiveWeek(0) : setActiveWeek(week)}
                >
                    {activeWeek === week ?
                        <Image src={expandUp} alt="expand up" className="cursor-pointer transition hover:scale-110 duration-300" />
                        : <Image src={expandDown} alt="expand down" className="cursor-pointer transition hover:scale-110 duration-300" />}
                </button>
            </div>
            {(week === activeWeek) && (
                <div className="flex flex-col gap-4 w-full py-4 px-8">
                    {testWeeks[`Week ${week}`].map((task: string, index: number) => (
                        <Task key={index * 100} title={task} />
                    ))}
                </div>
            )}
        </div>
    )
}

const Task: React.FC<TaskProps> = ({ title }) => {
    return (
        <div className="flex flex-row gap-4">
            <Image src={bulletPoint} alt="bullet point" />
            <div className="flex items-center w-9/12 bg-[#E6E6E6] px-8 rounded-2xl">
                <p className="text-black text-lg">{title}</p>
            </div>
        </div>
    );
}

export default function Goal() {
    const goal: string = testPlan1.goal;
    const numWeeks: number = testPlan1.numWeeks;
    const weeksArray: null[] = new Array(numWeeks).fill(null);

    const [activeWeek, setActiveWeek] = useState<number>(0);

    const startPlan = () => {
        console.log("Start plan");
    }

    return (
        <main className="flex min-h-screen flex-col p-8 bg-[#f5f5f5]">
            <div className="flex flex-col items-center">
                <p className="my-4 text-gray-400 text-lg font-bold">Plan</p>
                <p className="m-0 text-2xl font-bold">{goal}</p>
                <p className="my-4 text-xl font-bold text-[#3c3c3c]">{numWeeks} weeks</p>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-8 w-5/12">
                    {weeksArray.map((_: null, index: number) => (
                        <Week key={index} week={index + 1} activeWeek={activeWeek} setActiveWeek={setActiveWeek} />
                    ))}
                </div>
                <div className="flex flex-col items-end w-5/12">
                    <div className="h-80 w-full bg-gray-500" />
                    <div className="my-8">
                        <Link href="/dashboard/week">
                            <button
                                className="flex justify-center py-8 px-12 my-4 border-none rounded-2xl 
                            bg-[#666666] items-center cursor-pointer drop-shadow-md
                            transition hover:scale-110 duration-300"
                                onClick={() => startPlan()}
                            >
                                <p className="text-white text-xl">Start Plan</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
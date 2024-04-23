"use client";

import Link from "next/link";
import Image from "next/image";
import Calendar from "../../../../../public/icons/smallCalendar.svg";
import Check from "../../../../../public/icons/smallCheck.svg";
import Bell from "../../../../../public/icons/smallBell.svg";

const MetricsComponent: React.FC = () => {
    return (
        <div className="flex flex-row gap-24">
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#FA9E9E] p-3 rounded-lg">
                    <Image src={Calendar} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">Week 1</p>
                    <p className="text-[#B3B3B3]">Out of 4 weeks</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#9EFA9E] p-3 rounded-lg">
                    <Image src={Check} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">4 tasks</p>
                    <p className="text-[#B3B3B3]">Completed today</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 px-8 py-6 bg-[#FCFCFC] drop-shadow-lg rounded-md">
                <div className="bg-[#AD9EFA] p-3 rounded-lg">
                    <Image src={Bell} alt="calendar icon" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-medium">3 tasks due</p>
                    <p className="text-[#B3B3B3]">By Tuesday 14th</p>
                </div>
            </div>
        </div>
    )
}

export default function SinglePlan() {

    const planName = "Learn Python"

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex flex-col bg-white gap-8 p-8">
                <div className="flex flex-row text-3xl gap-1">
                    <Link href="/dashboard/plans" className="text-gray-400 underline">My Plans/</Link>
                    <span className="font-medium">{planName}</span>
                </div>
                <MetricsComponent />
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="bg-white w-full h-72">

                </div>
                <div className="w-2 h-full" />
                <div className="bg-white w-full h-72">

                </div>
            </div>
            <div className="bg-white w-full h-48">

            </div>
        </div>
    );
}
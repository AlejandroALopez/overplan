"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import Compass from "../../../../public/icons/compass.svg";
import Clock from "../../../../public/icons/clock.svg";
import Calendar from "../../../../public/icons/calendar.svg";
import PlannerProgressBar from "@/components/plannerProgressBar";

export default function ReviewPlan() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);
    const startDate = "Monday, Oct 8th"; // TODO: Replace with redux state

    const title = "Review & Create Plan";

    const submitPlanParams = () => {
        console.log("TODO");
        // TODO: API call to create plan
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-8">
            <PlannerProgressBar step={4} />
            <p className="text-3xl font-semibold mt-20">{title}</p>
            <div className="flex flex-row flex-wrap w-full justify-evenly items-center mt-20">
                <div className="flex flex-row gap-4">
                    <Image src={Compass} alt="goal icon" />
                    <div className="flex flex-col justify-center gap-2">
                        <p className="font-semibold text-2xl">Goal</p>
                        <p className="text-2xl">{goal}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <Image src={Clock} alt="weeks icon" />
                    <div className="flex flex-col justify-center gap-2">
                        <p className="font-semibold text-2xl">Length</p>
                        <p className="text-2xl">{weeks} weeks</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <Image src={Calendar} alt="date icon" />
                    <div className="flex flex-col justify-center gap-2">
                        <p className="font-semibold text-2xl">Start</p>
                        <p className="text-2xl">{startDate}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between my-24 w-1/2">
                <Link href="/planner/dates">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                    >
                        &lt; Back
                    </button>
                </Link>
                <Link href="/planner/result">
                    <button
                        className={`py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                        onClick={() => submitPlanParams()}
                    >
                        Create Plan
                    </button>
                </Link>
            </div>
        </main>
    );
}

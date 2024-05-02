"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";

import Compass from "../../../../public/icons/compass.svg";
import Clock from "../../../../public/icons/clock.svg";
import Calendar from "../../../../public/icons/calendar.svg";
import { createPlan } from "@/lib/api/plannerApi";
import { IPlanInput, Plan } from "@/lib/types/planTypes";
import { makeSlug } from "@/lib/utils/formatFunctions";
import { setPlan } from "@/lib/store/planSlice";

export default function ReviewPlan() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);
    const startDate = useAppSelector(state => state.input.startDate); // TODO: Replace with redux state

    const weekEndDate = dayjs(startDate).add(7, 'day').format('dddd, MMM DD');
    const slug = makeSlug(goal);

    const userId = "userId1"; // TODO: Replace with session id (or redux stored)

    const title = "Review & Create Plan";

    const mutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return createPlan(planInput);
        },
    });

    if (mutation.isSuccess) {
        router.push(`/planner/result`);
        dispatch(setPlan(mutation.data));
    }

    return (
        <>
            {mutation.isPending && (
                <main className="flex min-h-screen flex-col justify-center items-center p-8">
                    <div>
                        <p className="text-3xl font-semibold">Your Plan is being created...</p>
                    </div>
                </main>
            )}
            {!mutation.isPending && !mutation.isSuccess && (
                <main className="flex min-h-screen flex-col items-center p-8">
                    <p className="text-3xl font-semibold mt-12">{title}</p>
                    <div className="flex flex-row flex-wrap w-full justify-evenly items-center mt-20">
                        <div className="flex flex-row gap-4">
                            <Image src={Compass} alt="goal icon" />
                            <div className="flex flex-col justify-center gap-2">
                                <p className="font-semibold text-2xl">Goal</p>
                                <p className="text-2xl">{goal}</p>
                                <p>Slug: {slug}</p>
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
                                <p className="text-2xl">{dayjs(startDate).format('dddd, MMM DD')}</p>
                                <p>Week End: {weekEndDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-36 w-1/2">
                        <Link href="/planner/dates">
                            <button
                                className={`py-4 px-6 border-none rounded-md bg-primary 
                                text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                            >
                                &lt; Back
                            </button>
                        </Link>
                        <button
                            className={`py-4 px-6 border-none rounded-md bg-primary
                                text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                            onClick={() => {
                                mutation.mutate({
                                    slug: slug,
                                    userId: userId,
                                    goal: goal,
                                    numWeeks: weeks,
                                    currWeek: 1,
                                    weekProg: 0,
                                    weekEndDate: weekEndDate,
                                })
                            }}
                        >
                            Create Plan
                        </button>
                    </div>
                </main>
            )}
        </>
    );
}

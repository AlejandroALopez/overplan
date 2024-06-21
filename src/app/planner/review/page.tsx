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
import { setActivePlan } from "@/lib/store/planSlice";
import { REVIEW_TITLE, USER_ID } from "@/lib/constants/plannerConstants";

export default function ReviewPlan() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);
    const startDate = useAppSelector(state => state.input.startDate); // TODO: Replace with redux state

    const weekEndDate = dayjs(startDate).add(7, 'day').format('MM/DD/YYYY');
    const slug = makeSlug(goal);

    const mutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return createPlan(planInput);
        },
    });

    if (mutation.isSuccess) {
        dispatch(setActivePlan(null)); // reset plan
        router.push(`/planner/result`);
        dispatch(setActivePlan(mutation.data));
    }

    return (
        <>
            {mutation.isPending && (
                <main className="flex min-h-screen flex-col justify-center items-center p-8">
                    <div className="flex flex-col items-center justify-center gap-12">
                        <div className="big-loading-spinner"/>
                        <p className="text-2xl sm:text-3xl font-semibold">Your Plan is being created...</p>
                    </div>
                </main>
            )}
            {!mutation.isPending && !mutation.isSuccess && (
                <main className="flex min-h-screen flex-col items-center p-8">
                    <p className="text-3xl font-semibold mt-8">{REVIEW_TITLE}</p>
                    <div className="flex flex-col gap-12 mt-12">
                        <div className="flex flex-col items-center gap-4">
                            <Image src={Compass} alt="goal icon" />
                            <p className="text-xl w-11/12 text-center text-ellipsis overflow-hidden">{goal}</p>
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center gap-8 sm:gap-0">
                            <div className="flex flex-col items-center gap-4 w-full sm:w-fit">
                                <Image src={Clock} alt="weeks icon" />
                                <p className="text-xl text-center">{weeks} weeks</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 w-full sm:w-fit">
                                <Image src={Calendar} alt="date icon" />
                                <p className="text-xl text-center">Start: {dayjs(startDate).format('dddd, MMM DD')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-12 lg:my-16 w-full md:w-1/2">
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
                                    userId: USER_ID,
                                    goal: goal,
                                    numWeeks: weeks,
                                    currWeek: 1,
                                    weekProg: 0,
                                    startDate: startDate,
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

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
import { REVIEW_TITLE, USER_ID } from "@/lib/constants/plannerConstants";

export default function ReviewPlan() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);
    const startDate = useAppSelector(state => state.input.startDate); // TODO: Replace with redux state

    const weekEndDate = dayjs(startDate).add(7, 'day').format('dddd, MMM DD');
    const slug = makeSlug(goal);

    const mutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return createPlan(planInput);
        },
    });

    if (mutation.isSuccess) {
        dispatch(setPlan(null)); // reset plan
        router.push(`/planner/result`);
        dispatch(setPlan(mutation.data));
    }

    return (
        <>
            {mutation.isPending && (
                <main className="flex min-h-screen flex-col justify-center items-center p-8">
                    <div>
                        <p className="text-2xl sm:text-3xl font-semibold">Your Plan is being created...</p>
                    </div>
                </main>
            )}
            {!mutation.isPending && !mutation.isSuccess && (
                <main className="flex min-h-screen flex-col items-center p-8">
                    <p className="text-3xl font-semibold mt-12">{REVIEW_TITLE}</p>
                    <div className="flex flex-col sm:flex-row flex-wrap w-full justify-evenly gap-4 mt-12 sm:mt-20">
                        <div className="flex flex-row items-center gap-4 w-full sm:w-4/12">
                            <Image src={Compass} alt="goal icon" className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36" />
                            <div className="flex flex-col justify-center gap-2 sm:w-3/4">
                                <p className="font-semibold text-2xl">Goal</p>
                                <p className="text-2xl w-11/12 text-ellipsis overflow-hidden">{goal}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 max-sm:w-3/4">
                            <Image src={Clock} alt="weeks icon" className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36" />
                            <div className="flex flex-col justify-center gap-2">
                                <p className="font-semibold text-2xl">Length</p>
                                <p className="text-2xl">{weeks} weeks</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 max-sm:w-3/4">
                            <Image src={Calendar} alt="date icon" className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36" />
                            <div className="flex flex-col justify-center gap-2">
                                <p className="font-semibold text-2xl">Start</p>
                                <p className="text-2xl">{dayjs(startDate).format('dddd, MMM DD')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-16 lg:my-36 w-full lg:w-1/2">
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
                                    startDate: dayjs(startDate).format('MM/DD/YYYY'),
                                    weekEndDate: dayjs(weekEndDate).format('MM/DD/YYYY'),
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

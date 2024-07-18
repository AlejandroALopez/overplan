"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { createPlan } from "@/lib/api/plannerApi";
import { IPlanInput } from "@/lib/types/planTypes";
import { makeSlug } from "@/lib/utils/formatFunctions";
import { setActivePlan } from "@/lib/store/planSlice";
import { REVIEW_TITLE } from "@/lib/constants/plannerConstants";
import { setIsLoading, setIsNoTokensOpen } from "@/lib/store/modalSlice";

import Zap from "../../../../public/icons/zap.svg";
import Compass from "../../../../public/icons/compass.svg";
import Clock from "../../../../public/icons/clock.svg";
import Calendar from "../../../../public/icons/calendar.svg";
import { User } from "@/lib/types/sessionTypes";
import { updateUser } from "@/lib/api/usersApi";
import { setUserData } from "@/lib/store/sessionSlice";
import { useState } from "react";

export default function ReviewPlan() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.session.userData);
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);
    const startDate = useAppSelector(state => state.input.startDate); // TODO: Replace with redux state

    const weekEndDate = dayjs(startDate).add(7, 'day').format('MM/DD/YYYY');
    const slug = makeSlug(goal);

    const [hasRunSuccessBlock, setHasRunSuccessBlock] = useState(false); // ensure success runs only once

    const createPlanMutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return createPlan(planInput);
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: (userInput: Partial<User>) => {
            return updateUser(userData?.userId || "", userInput);
        },
        onError: () => {
            console.log('Error updating user');
            dispatch(setIsLoading(false));
        },
    });

    if (createPlanMutation.isSuccess) {
        dispatch(setActivePlan(null)); // reset plan
        dispatch(setActivePlan(createPlanMutation.data));

        // Update active plan Id and tokens on User (redux and mutation)
        if (userData && !hasRunSuccessBlock) {
            setHasRunSuccessBlock(true);
            updateUserMutation.mutate({
                activePlanId: createPlanMutation.data?._id || "",
                tokens: (userData.tokens || 0) - 1,
            });
            dispatch(setUserData({
                ...userData,
                activePlanId: createPlanMutation.data?._id || "",
                tokens: (userData.tokens || 0) - 1,
            }));
        }
        
        router.push(`/planner/result`);
    }

    // If enough tokens, create Plan. Else, display modal
    const handleCreatePlan = () => {
        if (userData?.tokens && userData?.tokens > 0) {
            // TODO: Remove 1 token (maybe on success)
            createPlanMutation.mutate({
                slug: slug,
                userId: userData?.userId,
                goal: goal,
                numWeeks: weeks,
                currWeek: 1,
                weekProg: 0,
                startDate: startDate,
                weekEndDate: weekEndDate,
            })
        } else {
            dispatch(setIsNoTokensOpen(true));
        }
    }

    return (
        <>
            {createPlanMutation.isPending && (
                <main className="flex min-h-screen flex-col justify-center items-center p-8">
                    <div className="flex flex-col items-center justify-center gap-12">
                        <div className="big-loading-spinner" />
                        <p className="text-2xl sm:text-3xl font-semibold">Your Plan is being created...</p>
                    </div>
                </main>
            )}
            {!createPlanMutation.isPending && !createPlanMutation.isSuccess && (
                <main className="flex min-h-screen flex-col items-center p-8">
                    <p className="text-3xl font-semibold mt-8">{REVIEW_TITLE}</p>
                    <div className="flex flex-col gap-12 mt-12">
                        <div className="flex flex-col items-center gap-4">
                            <Image src={Compass} alt="goal icon" />
                            <p className="text-xl w-11/12 text-center text-ellipsis overflow-hidden">{goal}</p>
                        </div>
                        <div className="flex flex-row flex-wrap justify-between items-center gap-8 sm:gap-12">
                            <div className="flex flex-col items-center gap-4 w-full sm:w-fit">
                                <Image src={Clock} alt="weeks icon" />
                                <p className="text-xl text-center">{weeks} weeks</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 w-full sm:w-fit">
                                <Image src={Calendar} alt="date icon" />
                                <p className="text-xl text-center">{dayjs(startDate).format('ddd, MMM DD')}</p>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-row justify-between my-12 lg:my-16 w-full md:w-1/2">
                        <Link href="/planner/dates">
                            <button
                                className={`h-16 w-28 border-none rounded-md bg-primary 
                                drop-shadow-lg transition hover:scale-110 duration-300`}
                            >
                                <p className="text-white text-lg sm:text-xl">&lt; Back</p>
                            </button>
                        </Link>
                        <div className="flex flex-row gap-4">
                            <button
                                className={`h-16 w-40 border-none rounded-md bg-primary
                                 drop-shadow-lg transition hover:scale-110 duration-300`}
                                onClick={() => handleCreatePlan()}
                            >
                                <p className="text-white text-lg sm:text-xl">Create Plan</p>
                            </button>
                            <div className="flex flex-row px-4 py-4 gap-3 border-2 border-[#B3B3B3] rounded-2xl">
                                <Image src={Zap} alt="zap icon" />
                                <p className="text-xl font-medium text-center">{userData?.tokens}</p>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

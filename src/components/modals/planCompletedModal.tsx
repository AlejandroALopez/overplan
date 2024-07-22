"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsPlanCompletedOpen } from "@/lib/store/modalSlice";
import { badgeColorPicker, badgeSelector } from "@/lib/constants/badgesConstants";

export default function PlanCompletedModal() {
    const dispatch = useAppDispatch();
    const completedPlan: { goal: string, weeks: number } = useAppSelector(state => state.modal.completedPlan);
    const isPlanCompletedOpen = useAppSelector(state => state.modal.isPlanCompletedOpen);

    const closeModal = () => {
        dispatch(setIsPlanCompletedOpen(false));
    }

    if (!isPlanCompletedOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div onClick={closeModal} className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-10/12 md:w-7/12 mx-auto p-6">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-2xl sm:text-3xl font-semibold text-center">Congratulations!</p>
                    <p className="text-lg sm:text-xl text-[#666666] text-center">You successfully completed your goal and earned a badge!</p>
                    <Image src={badgeSelector[badgeColorPicker(completedPlan.weeks)]} alt="badge" className="my-4" />
                    <p className="text-2xl sm:text-3xl font-medium text-center">{completedPlan.goal}</p>
                    <p className="text-lg sm:text-xl font-regular text-center">{completedPlan.weeks} weeks</p>
                </div>
                <div className="flex flex-row justify-end">
                    <button
                        className='py-4 px-6 mt-4 border-none rounded-md bg-primary text-white text-lg drop-shadow-lg 
                        transition hover:scale-110 duration-300'
                        onClick={() => closeModal()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
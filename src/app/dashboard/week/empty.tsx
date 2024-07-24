'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setIsNoTokensOpen } from "@/lib/store/modalSlice";
import EmptyIcon from "../../../../public/icons/empty.svg";

export default function Empty() {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    const userData = useAppSelector(state => state.session.userData);

    // If enough tokens, redirect to planner. Else, display modal
    const handleCreatePlan = () => {
        if (userData?.tokens && userData?.tokens > 0) {
            router.push("/planner/goal");
        } else {
            dispatch(setIsNoTokensOpen(true));
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
            <div className="flex flex-col items-center justify-center gap-8 bg-white px-6 rounded-sm">
                <Image src={EmptyIcon} alt="empty icon" />
                <p className="text-3xl font-medium text-center">No Plans Yet</p>
                <p className="text-lg md:text-xl text-center max-w-[600px]">
                    It looks like you haven&apos;t created any plans yet.
                    Start by creating a new plan to organize your tasks and stay on track with your goals.
                </p>
                <button
                    onClick={handleCreatePlan}
                    className="px-6 h-16 border-none rounded-md bg-primary
                            drop-shadow-lg transition hover:scale-110 duration-300"
                >
                    <p className="text-lg sm:text-xl text-white">Create Plan</p>
                </button>
            </div>
        </div>
    )
}
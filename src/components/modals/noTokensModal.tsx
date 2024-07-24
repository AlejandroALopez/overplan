"use client";

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsNoTokensOpen } from "@/lib/store/modalSlice";
import Link from "next/link";

export default function NoTokensModal() {
    const dispatch = useAppDispatch();
    const isNoTokensOpen = useAppSelector(state => state.modal.isNoTokensOpen);
    const userData = useAppSelector(state => state.session.userData);

    const heading: string = (userData?.tier === 'Free')
        ? "You reached the limit of the Free Trial"
        : "You reached the limit of generated plans this month";

    const closeModal = () => {
        dispatch(setIsNoTokensOpen(false));
    }

    if (!isNoTokensOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div onClick={closeModal} className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative flex flex-col items-center bg-white rounded-lg max-w-lg shadow-lg mx-6 p-12 gap-8">
                <p className="text-2xl font-medium text-center">{heading}</p>
                {(userData?.tier === 'Free')
                    ? (<p className="text-lg font-normal text-center">
                        Achieve more goals by upgrading your account. Gain access to {" "}
                        <span className="text-primary font-medium">up to 10 AI-generated plans every month.</span>
                    </p>)
                    : (<p className="text-lg font-normal text-center">
                        You&apos;ll get more plans soon. Meanwhile, focus on progressing with your current plans.
                    </p>)
                }
                {(userData?.tier === 'Free')
                    ? (<Link href={"/dashboard/subscriptions"} onClick={closeModal}
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                            drop-shadow-lg transition hover:scale-110 duration-300`}>
                        <p className="text-white text-xl ">Upgrade Account</p>
                    </Link>)
                    : (<Link href={"/dashboard/week"} onClick={closeModal}
                        className={`py-4 px-6 border-none rounded-md bg-primary 
                            drop-shadow-lg transition hover:scale-110 duration-300`}>
                        <p className="text-white text-xl ">Go to Dashboard</p>
                    </Link>)
                }
            </div>
        </div>
    )
}
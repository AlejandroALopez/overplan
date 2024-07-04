'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setIsConfirmOpen, setMessage, setOnConfirm } from "@/lib/store/modalSlice";
import { removeTokensInCookies } from '@/lib/utils/auth';

export default function AccountPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.session.userData);
    const renewDate: string = "May 16th, 2024";

    // Remove tokens and redirect to login
    const handleLogout = () => {
        removeTokensInCookies();
        router.push("/auth/login");
    }

    const handleCancelSubscription = () => {
        console.log('TODO');
        // TODO
        // 1. Open Confirmation Modal
        // 2. Pass it function to cancel sub on stripe + remove benefits + success modal
    }

    const openConfirmModal = (message: string, onConfirm: () => void) => {
        dispatch(setMessage(message));
        dispatch(setOnConfirm(onConfirm));
        dispatch(setIsConfirmOpen(true));
    };

    return (
        <div className='flex flex-col w-full gap-6 sm:gap-8 p-12 bg-white min-h-screen'>
            <p className='text-3xl sm:text-4xl font-semibold'>My Account</p>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Name</p>
                <p className='text-lg sm:text-xl'>{userData?.firstName} {userData?.lastName}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Email</p>
                <p className='text-lg sm:text-xl'>{userData?.email}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Subscription Plan</p>
                <div className='flex flex-row items-center gap-6'>
                    <p className='text-lg sm:text-xl'>{userData?.tier}</p>
                    {userData?.tier === 'Free' &&
                        <Link
                            href='/dashboard/subscriptions'
                            className='text-primary text-md transition hover:scale-105 duration-300'
                        >
                            Upgrade
                        </Link>
                    }
                </div>
            </div>
            {userData?.tier === 'Pro' &&
                <div className='flex flex-col gap-2'>
                    <p className='text-lg sm:text-xl text-[#999999]'>Renews on</p>
                    <div className='flex flex-row items-center gap-6'>
                        <p className='text-lg sm:text-xl'>{renewDate}</p>
                        <button
                            onClick={() => handleCancelSubscription()}
                            className='text-[#EB4747] text-md transition hover:scale-105 duration-300'
                        >
                            Cancel Subscription
                        </button>
                    </div>
                </div>
            }
            <button
                className="py-3 px-6 w-fit mt-8 rounded-md bg-white border-primary border-[1px] text-lg font-medium text-primary
                drop-shadow-lg transition hover:scale-105 hover:bg-primary hover:text-white duration-300"
                onClick={() => openConfirmModal("Are you sure you want to log out?", handleLogout)}
            >
                Log Out
            </button>
        </div >
    );
}

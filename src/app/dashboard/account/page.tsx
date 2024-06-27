'use client';

import Link from 'next/link';

export default function AccountPage() {
    // const plan: string = 'Free';
    const plan: string = 'Pro';
    const renewDate: string = "May 16th, 2024";

    const handleLogout = () => {
        console.log('TODO');
        // TODO
        // 1. Open Confirmation Modal
        // 2. Pass it function to remove user data + remove tokens + redirect to login
    }

    const handleCancelSubscription = () => {
        console.log('TODO');
        // TODO
        // 1. Open Confirmation Modal
        // 2. Pass it function to cancel sub on stripe + remove benefits + success modal
    }

    return (
        <div className='flex flex-col w-full gap-6 sm:gap-8 p-12 bg-white min-h-screen'>
            <p className='text-3xl sm:text-4xl font-semibold'>My Account</p>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Name</p>
                <p className='text-lg sm:text-xl'>John Doe</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Email</p>
                <p className='text-lg sm:text-xl'>john.doe@gmail.com</p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-lg sm:text-xl text-[#999999]'>Subscription Plan</p>
                <div className='flex flex-row items-center gap-6'>
                    <p className='text-lg sm:text-xl'>{plan}</p>
                    {plan === 'Free' &&
                        <Link
                            href='/dashboard/subscriptions'
                            className='text-primary text-md transition hover:scale-105 duration-300'
                        >
                            Upgrade
                        </Link>
                    }
                </div>
            </div>
            {plan === 'Pro' &&
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
                onClick={() => handleLogout()}
            >
                Log Out
            </button>
        </div >
    );
}

'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setUserData } from '@/lib/store/sessionSlice';
import { useUserById } from '@/hooks/queries';
import Loading from './loading';
import Error from './error';

export default function PaymentSuccessPage() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.session.userData);

    const { isPending, error, data: newUserData, isSuccess } = useUserById(userData?.userId || "");

    useEffect(() => {
        if (newUserData) {
            const data = {
                userId: newUserData._id,
                email: newUserData.email,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                activePlanId: newUserData.activePlanId,
                tier: newUserData.tier,
                tokens: newUserData.tokens,
                subscriptionId: newUserData.subscriptionId,
                renewalDate: newUserData.renewalDate
            };

            dispatch(setUserData(data));
        }
    }, [newUserData])

    if (isPending) return (<Loading />)
    if (error) return (<Error />)

    return (
        <div className='flex flex-col items-center justify-center w-full gap-8 p-12 bg-white'>
            <p className='text-3xl font-semibold text-center'>Thanks for upgrading to Pro!</p>
            <p className='text-lg text-center'>Enjoy up to 10 plans per month</p>
        </div>
    );
}
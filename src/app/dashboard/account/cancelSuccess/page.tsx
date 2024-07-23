'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setUserData } from '@/lib/store/sessionSlice';
import { useUserById } from '@/hooks/queries';
import Loading from './loading';
import Error from './error';

export default function CancelSuccessPage() {
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
                renewalDate: newUserData.renewalDate,
                subActive: newUserData.subActive,
            };

            dispatch(setUserData(data));
        }
    }, [newUserData])

    if (isPending) return (<Loading />)
    if (error) return (<Error />)

    return (
        <div className='flex flex-col items-center justify-center w-full gap-8 p-12 bg-white'>
            <p className='text-3xl font-semibold text-center'>Your subscription was canceled successfully</p>
            <p className='text-lg text-center'>Your tokens won't be recharged, but you can still use the ones you have left.</p>
        </div>
    );
}
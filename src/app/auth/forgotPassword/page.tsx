"use client";

import React, { useState } from 'react';
import { sendResetPasswordLink } from '@/lib/api/authApi';
import Link from 'next/link';

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        const newMessage = await sendResetPasswordLink(email);
        setMessage(newMessage);
    };

    return (
        <div className='flex justify-center my-24'>
            <div className='flex flex-col items-center bg-white gap-6 drop-shadow-lg rounded-lg p-8 w-full sm:w-2/3 md:w-1/2 xl:w-1/3'>
                <p className='text-2xl text-center font-semibold'>Forgot your password?</p>
                <p className='text-center w-80'>Enter your email and we will send you instructions to reset your password.</p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center gap-8 w-full'
                >
                    <input
                        type="email"
                        value={email}
                        className='w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button
                        className={`p-4 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
                            transition hover:scale-105 duration-300`}
                        type="submit"
                    >
                        <p className='text-white font-semibold'>Send reset link</p>
                    </button>
                </form>
                <div className='flex flex-row gap-1'>
                    <p className="text-[#999999]">Know your password?</p>
                    <Link href="/auth/login">
                        <p className="text-primary font-medium transition hover:scale-105 duration-300">Log in</p>
                    </Link>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

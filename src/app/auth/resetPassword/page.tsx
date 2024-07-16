"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { resetPassword } from '@/lib/api/authApi';

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token');

    const [pass, setPass] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        if (token) {
            const newMessage = await resetPassword(token, pass);
            setMessage(newMessage);
        } else {
            setMessage("Reset token missing");
        }
    };

    return (
        <div className='flex justify-center my-24'>
            <div className='flex flex-col items-center bg-white gap-6 drop-shadow-lg rounded-lg p-8 w-full sm:w-2/3 md:w-1/2 xl:w-1/3'>
                <p className='text-2xl text-center font-semibold'>Reset your password</p>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center gap-8 w-full'
                >
                    <input
                        type="password"
                        value={pass}
                        className='w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg'
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Enter your new password"
                        required
                    />
                    <button
                        className={`p-4 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
                            transition hover:scale-105 duration-300`}
                        type="submit"
                    >
                        <p className='text-white font-semibold'>Reset password</p>
                    </button>
                </form>
                {message && <p>{message}</p>}
                {(message === "Password reset successful") && (
                    <Link href="/auth/login">
                        <p className="text-primary font-medium transition hover:scale-105 duration-300">Back to login</p>
                    </Link>
                )}
            </div>
        </div>
    );
};

"use client";

import Link from "next/link";
import { useState } from 'react';
import { registerUser } from '@/lib/api/authApi';
import { useRouter } from "next/navigation";
import GoogleLoginButton from '@/components/GoogleLoginButton';
// import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const registerData = await registerUser({ email, password: pass, firstName, lastName });

        if (registerData.success) {
            router.push(`/`); // TODO: Replace with dashboard after gaining access to token
        }
    };

    return (
        <div className='flex justify-center my-12'>
            <div className='flex flex-col bg-white gap-4 drop-shadow-lg rounded-lg p-8 lg:w-1/3 md:w-1/2 sm:w-2/3 w-full'>
                <p className='w-full text-center text-2xl font-semibold'>Create an Account</p>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col gap-2 xl:w-40 w-36">
                        <p className='font-semibold'>First Name</p>
                        <input
                            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-2xl bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
                            placeholder={""}
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 xl:w-40 w-36">
                        <p className='font-semibold'>Last Name</p>
                        <input
                            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-2xl bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
                            placeholder={""}
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='font-semibold'>Email</p>
                    <input
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-2xl bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
                        placeholder={"Enter email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p className='font-semibold'>Password</p>
                    <input
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-2xl bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
                        placeholder={"Enter password"}
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />
                </div>
                <button
                    className={`p-3 border-none rounded-2xl bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
              transition hover:scale-105 duration-300`}
                    onClick={handleSubmit}
                >
                    <p className='text-white font-semibold'>Create Account</p>
                </button>
                <div className='flex flex-col gap-2'>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="bg-[#D9D9D9] w-1/2 h-0.5" />
                        <p className="text-[#999999] font-medium">OR</p>
                        <div className="bg-[#D9D9D9] w-1/2 h-0.5" />
                    </div>
                    <GoogleLoginButton />
                    <div className='flex flex-row gap-1'>
                        <p className="text-[#999999]">Already have an account?</p>
                        <Link href="/auth/login">
                            <p className="text-primary font-medium underline transition hover:scale-105 duration-300">Log in</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import Link from "next/link";
import { useState } from 'react';
import { registerUser } from '@/lib/api/authApi';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        // Handle empty fields and password mismatch
        if (!firstName) {
            setErrorMsg("Please enter your first name");
            return;
        } else if (!lastName) {
            setErrorMsg("Please enter your last name");
            return;
        } else if (!email) {
            setErrorMsg("Please enter your email");
            return;
        } else if (!pass) {
            setErrorMsg("Please enter your password");
            return;
        } else if(pass !== confirmPass) {
            setErrorMsg("Please make sure your passwords match");
            return;
        }

        const error = await registerUser({ email, password: pass, firstName, lastName });

        if (error) setErrorMsg(error);
    };

    return (
        <div className='flex justify-center my-12'>
            <div className='flex flex-col bg-white gap-4 drop-shadow-lg rounded-lg p-8 w-full sm:w-2/3 md:w-1/2 xl:w-1/3'>
                <p className='w-full text-center text-2xl font-semibold'>Create an Account</p>
                {errorMsg && (
                    <div className="flex justify-center bg-red-100 p-2 border-[1px] border-red-400 rounded-sm">
                        <p className="text-red-500 text-sm w-full text-center">{errorMsg}</p>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-2'
                >
                    <p className='font-semibold'>First Name</p>
                    <input

                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                    <p className='font-semibold'>Last Name</p>
                    <input
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                    <p className='font-semibold'>Email</p>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <p className='font-semibold'>Password</p>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
                        placeholder="Enter your password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        required
                    />
                    <p className='font-semibold'>Confirm Password</p>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
                        placeholder="Confirm your password"
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                        required
                    />
                    <button
                        className={`p-3 mt-4 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
              transition hover:scale-105 duration-300`}
                        type="submit"
                    >
                        <p className='text-white font-semibold'>Create Account</p>
                    </button>
                </form>
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
                            <p className="text-primary font-medium transition hover:scale-105 duration-300">Log in</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}
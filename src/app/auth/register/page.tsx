"use client";

import { useState } from 'react';
import { registerUser } from '@/lib/api/authApi';
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const registerData = await registerUser({email, password, firstName, lastName});

        if(registerData.success) {
            router.push(`/`); // TODO: Replace with dashboard after gaining access to token
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <form 
                className='flex flex-col items-center gap-4 '
                onSubmit={handleSubmit}
            >
                <input
                    type="email"
                    className='border-primary border-[1px] rounded-lg p-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className='border-primary border-[1px] rounded-lg p-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    className='border-primary border-[1px] rounded-lg p-2'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    className='border-primary border-[1px] rounded-lg p-2'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <button 
                    type="submit"
                    className='py-4 px-6 w-40 border-none rounded-md bg-primary text-white text-lg drop-shadow-lg 
                    transition hover:scale-110 duration-300'
                >
                    Register
                </button>
            </form>
        </div>
    );
}
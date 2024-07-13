"use client";

import Link from "next/link";
import { useState } from 'react';
import { loginUser } from '@/lib/api/authApi';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");

    // Handle empty fields
    if(!email) {
      setErrorMsg("Please enter your email");
      return;
    } 

    if(!pass) {
      setErrorMsg("Please enter your password");
      return;
    }
    
    // Call login route. Redirects on sucess, otherwise display error message
    const response = await loginUser({ email, password: pass });

    if (response) setErrorMsg(response);
  };

  return (
    <div className='flex justify-center my-12'>
      <div className='flex flex-col bg-white gap-6 drop-shadow-lg rounded-lg p-8 lg:w-1/3 md:w-1/2 sm:w-2/3 w-full'>
        <p className='w-full text-center text-2xl font-semibold'>Log In</p>
        {errorMsg && (
          <div className="flex justify-center bg-red-100 p-2 border-[1px] border-red-400 rounded-sm">
            <p className="text-red-500 text-sm w-full text-center">{errorMsg}</p>
          </div>
        )}
        <div className='flex flex-col gap-4'>
          <p className='font-semibold'>Email</p>
          <input
            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
            placeholder={"Enter email"}
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p className='font-semibold'>Password</p>
          <input
            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg bg-[#A6A6A6] bg-opacity-25 text-md md:text-lg"
            placeholder={"Enter password"}
            required={true}
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>
        <button
          className={`p-3 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
            transition hover:scale-105 duration-300`}
          onClick={handleSubmit}
        >
          <p className='text-white font-semibold'>Login</p>
        </button>
        <div className='flex flex-col gap-2'>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#D9D9D9] w-1/2 h-0.5" />
            <p className="text-[#999999] font-medium">OR</p>
            <div className="bg-[#D9D9D9] w-1/2 h-0.5" />
          </div>
          <GoogleLoginButton />
          <div className='flex flex-row gap-1'>
            <p className="text-[#999999]">Don&apos;t have an account?</p>
            <Link href="/auth/register">
              <p className="text-primary font-medium underline transition hover:scale-105 duration-300">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
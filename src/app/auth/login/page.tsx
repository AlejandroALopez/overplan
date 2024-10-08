"use client";

import Link from "next/link";
import { useState } from 'react';
import { loginUser } from '@/lib/api/authApi';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Handle empty fields
    if (!email) {
      setErrorMsg("Please enter your email");
      return;
    } else if (!pass) {
      setErrorMsg("Please enter your password");
      return;
    }

    // Call login route. Redirects on sucess, otherwise display error message
    const error = await loginUser({ email, password: pass });

    if (error) setErrorMsg(error);
  };

  return (
    <div className='flex justify-center my-12'>
      <div className='flex flex-col bg-white gap-6 drop-shadow-lg rounded-lg p-8 w-full sm:w-2/3 md:w-1/2 xl:w-1/3'>
        <p className='w-full text-center text-2xl font-semibold'>Log In</p>
        {errorMsg && (
          <div className="flex justify-center bg-red-100 p-2 border-[1px] border-red-400 rounded-sm">
            <p className="text-red-500 text-sm w-full text-center">{errorMsg}</p>
          </div>
        )}
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit}
        >
          <p className='font-semibold'>Email</p>
          <input
            type="email"
            value={email}
            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <div className="flex flex-row items-center justify-between mt-2">
            <p className='font-semibold'>Password</p>
            <Link href="/auth/forgotPassword">
              <p className="text-primary text-sm font-medium transition hover:scale-105 duration-300">Forgot password</p>
            </Link>
          </div>
          <input
            type="password"
            value={pass}
            className="w-full px-4 py-2 border-[#808080] border-[1px] rounded-lg text-md md:text-lg"
            onChange={e => setPass(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className={`p-3 mt-4 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
            transition hover:scale-105 duration-300`}
            onClick={handleSubmit}
          >
            <p className='text-white font-semibold'>Login</p>
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
            <p className="text-[#999999]">Don&apos;t have an account?</p>
            <Link href="/auth/register">
              <p className="text-primary font-medium transition hover:scale-105 duration-300">Sign up</p>
            </Link>
          </div>
        </div>
      </div >
    </div >
  );
}
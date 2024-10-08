'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/lib/store";
import { setUserData } from "@/lib/store/sessionSlice";
import { getTokensFromCookies, setTokensInCookies } from "@/lib/utils/auth";
import Loading from "./loading";
import Logo from '../../public/logos/bigLogo.svg';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const token = new URL(window.location.href).searchParams.get('token');
    const refreshToken = new URL(window.location.href).searchParams.get('refreshToken');
    const userData = new URL(window.location.href).searchParams.get('userData');

    if (token && refreshToken && userData) { // checks for successful auth
      setTokensInCookies(token, refreshToken);
      dispatch(setUserData(JSON.parse(userData)));
      router.push('/dashboard/week'); // Redirect to a protected page
    } else { // checks if cookies already present
      const { token, refreshToken } = getTokensFromCookies();
      if (token && refreshToken) {
        router.push('/dashboard/week'); // Redirect to a protected page
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col p-8 min-h-screen bg-[#FAFAFA]">
      {/* Logo */}
      <Image
        src={Logo}
        width={260}
        height={52}
        sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 5vw"
        alt="logo" />
      <div className="flex flex-col items-center justify-center gap-16 min-h-[70vh]">
        <Link
          className={`flex items-center justify-center p-4 w-48 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
            transition hover:scale-105 duration-300`}
          href="/auth/login"
        >
          <p className='text-white font-semibold'>Login</p>
        </Link>
        <Link
          className={`flex items-center justify-center p-4 w-48 border-none rounded-lg bg-[#2A2A2A] text-white text-xl drop-shadow-lg 
            transition hover:scale-105 duration-300`}
          href="/auth/register"
        >
          <p className='text-white font-semibold'>Register</p>
        </Link>
      </div>

    </div>
  );
}

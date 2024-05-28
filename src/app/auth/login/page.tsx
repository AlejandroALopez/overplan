"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Home() {
  const router = useRouter();

//   useEffect(() => {
//     const token = router.query.token;
//     if (token) {
//       localStorage.setItem('token', token);
//       router.push('/dashboard'); // Redirect to a protected page
//     }
//   }, [router.query]);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-12'>
      <h1 className='text-2xl font-semibold'>Login</h1>
      <GoogleLoginButton />
      {/* Add other login methods (e.g., email/password) here */}
    </div>
  );
}
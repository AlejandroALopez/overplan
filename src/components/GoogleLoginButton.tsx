'use client';

import Image from "next/image";
import GoogleIcon from "../../public/logos/google.svg";

export default function GoogleLoginButton() {
    const handleGoogleLogin = () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };
  
    return (
      <button 
        className="flex flex-row justify-center items-center border-2 border-[#D9D9D9] rounded-lg gap-2
          transition hover:scale-105 duration-300"
        onClick={handleGoogleLogin}
      >
        <Image src={GoogleIcon} alt="Google icon" />
        Sign up with Google
      </button>
    );
  }
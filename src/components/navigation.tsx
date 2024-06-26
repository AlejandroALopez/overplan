'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import Home from "../../public/icons/home.svg";
import Map from "../../public/icons/map.svg";
import Badge from "../../public/icons/award.svg";
import Menu from "../../public/icons/menu.svg";
import Settings from "../../public/icons/settings.svg";
import Logout from "../../public/icons/logout.svg";


export default function Navigation() {
  const pathname = usePathname();
  const app_name: string = "OverPlan AI";
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // TODO
    // 1. Open Confirmation Modal
    // 2. Pass it function to remove user data + remove tokens + redirect to login
  }

  return (
    <>
      <div className="flex flex-row sm:flex-col gap-8 m-0 sm:w-52 shrink-0 px-4 py-2 sm:px-0 sm:py-8 bg-white text-center min-h-full">
        <div className="flex text-center justify-between sm:justify-center items-center w-full">
          <p className="text-2xl font-semibold">{app_name}</p>
          <button onClick={toggleMenu} className="sm:hidden">
            <Image src={Menu} alt="Menu" />
          </button>
        </div>
        <div className="hidden sm:flex flex-row sm:flex-col items-center gap-4 mt-2">
          <Link href="/dashboard/week" className={`flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/week' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
            <Image src={Home} alt="my weeks icon" />
            <p className="font-medium">My Week</p>
          </Link>
          <Link href="/dashboard/plans" className={`flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/plans' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
            <Image src={Map} alt="my plans icon" />
            <p className="font-medium">My Plans</p>
          </Link>
          {/* <Link href="/dashboard/badges" className={`flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/badges' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
            <Image src={Badge} alt="my badges icon" />
            <p className="font-medium">My Badges</p>
          </Link> */}
          <div className="bg-[#D9D9D9] h-0.5 w-11/12  rounded-md" />
          <Link href="/dashboard/settings" className={`flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/settings' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
            <Image src={Settings} alt="settings icon" />
            <p className="font-medium">Settings</p>
          </Link>
          <button
            onClick={handleLogout}
            className='flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-opacity-10 rounded-md
               transition hover:scale-105 duration-300'>
            <Image src={Logout} alt="logout icon" />
            <p className="font-medium">Log Out</p>
          </button>
          <div className="bg-[#D9D9D9] h-0.5 w-11/12 rounded-md" />
        </div>
      </div>
      {/* Accordion Menu for Smaller Screens */}
      <div className={`w-full flex-wrap py-2 justify-evenly bg-[#f5f5f5] ${showMenu ? 'max-sm:flex sm:hidden' : 'hidden'}`}>
        <Link href="/dashboard/week" className={`flex flex-row items-center justify-center gap-4 w-56 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/week' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
          <Image src={Home} alt="my weeks icon" />
          <p className="font-medium">My Week</p>
        </Link>
        <Link href="/dashboard/plans" className={`flex flex-row items-center justify-center gap-4 w-56 py-3 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/plans' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
          <Image src={Map} alt="my plans icon" />
          <p className="font-medium">My Plans</p>
        </Link>
      </div>
    </>

  );
}
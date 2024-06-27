'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import Home from "../../public/icons/home.svg";
import Map from "../../public/icons/map.svg";
import Badge from "../../public/icons/award.svg";
import Menu from "../../public/icons/menu.svg";
import User from "../../public/icons/user.svg";
import CreditCard from "../../public/icons/creditCard.svg";


export default function Navigation() {
  const pathname = usePathname();
  const app_name: string = "OverPlan AI";
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Vertical Menu for Big Screens */}
      <div className="flex flex-row sm:flex-col gap-8 m-0 sm:w-52 shrink-0 px-4 py-2 sm:px-0 sm:py-8 bg-white text-center min-h-full">
        <div className="flex text-center justify-between sm:justify-center items-center w-full">
          <p className="text-2xl font-semibold">{app_name}</p>
          <button onClick={toggleMenu} className="sm:hidden">
            <Image src={Menu} alt="Menu" />
          </button>
        </div>
        <div className="hidden sm:flex flex-row sm:flex-col items-center justify-between mt-2 h-full">
          {/* Top Buttons */}
          <div className="flex flex-col items-center w-full gap-1">
            <Link href="/dashboard/week" className={`flex flex-row items-center gap-4 w-11/12 py-3 px-6 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/week' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
              <Image src={Home} alt="my weeks icon" />
              <p className="font-medium">My Week</p>
            </Link>
            <Link href="/dashboard/plans" className={`flex flex-row items-center gap-4 w-11/12 py-3 px-6 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/plans' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
              <Image src={Map} alt="my plans icon" />
              <p className="font-medium">My Plans</p>
            </Link>
            <Link href="/dashboard/badges" className={`flex flex-row items-center gap-4 w-11/12 py-3 px-6 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/badges' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
            <Image src={Badge} alt="my badges icon" />
            <p className="font-medium">My Badges</p>
          </Link>
          </div>
          {/* Bottom Buttons */}
          <div className="flex flex-col items-center w-full gap-1">
            <div className="bg-[#D9D9D9] h-0.5 w-11/12 mb-4 rounded-md" />
            <Link href="/dashboard/account" className={`flex flex-row items-center gap-4 w-11/12 py-3 px-6 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/account' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
              <Image src={User} alt="account icon" />
              <p className="font-medium">Account</p>
            </Link>
            <Link href="/dashboard/subscriptions" className={`flex flex-row items-center gap-4 w-11/12 py-3 px-6 bg-opacity-10 rounded-md
          ${pathname === '/dashboard/subscriptions' ? "bg-primary" : "bg-white"} transition hover:scale-105 duration-300`}>
              <Image src={CreditCard} alt="subscriptions icon" />
              <p className="font-medium">Subscriptions</p>
            </Link>
          </div>
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
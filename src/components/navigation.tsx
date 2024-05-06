'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import Home from "../../public/icons/home.svg";
import Map from "../../public/icons/map.svg";
import Menu from "../../public/icons/menu.svg";

export default function Navigation() {
  const pathname = usePathname();
  const app_name: string = "OverPlan AI";
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
        </div>
      </div>
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
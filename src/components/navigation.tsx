'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Home from "../../public/icons/home.svg";
import Map from "../../public/icons/map.svg";

export default function Navigation() {
  const pathname = usePathname();
  const app_name: string = "OverPlan AI";

  return (
    <div className="flex flex-col gap-8 m-0 w-1/6 py-8 bg-white text-center min-h-full">
      <div className="flex text-center justify-center">
        <p className="text-2xl font-semibold">{app_name}</p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-2">
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
  );
}
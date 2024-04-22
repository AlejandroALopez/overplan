// import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";

export default function Home() {

  const app_name: string = "OverPlan AI";

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="p-16 bg-[#f5f5f5]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-5/12">
            <p className="text-3xl">
              Want to make a detailed plan to reach your goal?
              Make one in seconds with <span className="font-bold">{app_name}</span>!
            </p>
            <p className="mt-12 text-3xl"><span className="font-bold">{app_name}</span> uses AI to build the perfect plan for you!</p>
            <div className="mt-8 text-right">
              <Link href="/planner/goal">
                <button className="w-36 p-4 border-none rounded-3xl bg-gray-500 text-white 
                   cursor-pointer drop-shadow-lg transition hover:scale-110 duration-300">Get Started</button>
              </Link>
            </div>
          </div>
          <div className="w-96 h-80 bg-[#d9d9d9]" />
        </div>
        <div className="flex flex-col items-center mt-16">
          <div className="flex mb-4">
            <p className="text-2xl font-bold">What {app_name} offers</p>
          </div>
          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col items-center w-2/6">
              <div className="w-72 h-64 my-6 bg-[#d9d9d9]" />
              <p className="w-4/5 text-center text-xl">Build a plan fast by answering a few questions</p>
            </div>
            <div className="flex flex-col items-center w-2/6">
              <div className="w-72 h-64 my-6 bg-[#d9d9d9]" />
              <p className="w-4/5 text-center text-xl">Get a plan organized in weekly sprints that keeps track of completed steps</p>
            </div>
            <div className="flex flex-col items-center w-2/6">
              <div className="w-72 h-64 my-6 bg-[#d9d9d9]" />
              <p className="w-4/5 text-center text-xl">Edit any part of the plan at any time to fit your schedule</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

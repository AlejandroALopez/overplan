'use client';

import { usePathname } from 'next/navigation'

interface PathsToPercentageType {
    [key: string]: string
};

export default function PlannerProgressBar() {
    const pathname = usePathname();

    const pathsToPercentage: PathsToPercentageType = {
        "/planner/goal": "w-4",
        "/planner/weeks": "w-1/3",
        "/planner/dates": "w-2/3",
        "/planner/review": "w-full",
        "/planner/result": "w-full",
    }

    // return (
    //     <div className="h-4 w-64 sm:w-96 bg-primary bg-opacity-25 rounded-3xl">
    //         <div className={`h-4 ${pathsToPercentage[pathname]} bg-primary rounded-3xl`} />
    //     </div>
    // );

    return (
        <div className='flex flex-col items-center gap-3'>
            <div className="flex flex-row items-center h-4 w-64 sm:w-96 bg-primary bg-opacity-25 rounded-3xl">
                <div className={`h-4 ${pathsToPercentage[pathname]} bg-primary rounded-3xl`} />
            </div>
            <div className="flex justify-between w-full text-sm">
                <p className={`${pathname === "/planner/goal" ? "text-primary font-medium" : "text-[#999999]"}`}>Goal</p>
                <p className={`${pathname === "/planner/weeks" ? "text-primary font-medium" : "text-[#999999]"}`}># Weeks</p>
                <p className={`${pathname === "/planner/dates" ? "text-primary font-medium" : "text-[#999999]"}`}>Start</p>
                <p className={`${pathname === "/planner/review" ? "text-primary font-medium" : "text-[#999999]"}`}>Review</p>
            </div>
        </div>
    );
}
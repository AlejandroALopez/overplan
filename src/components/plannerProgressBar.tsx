'use client';

import { usePathname } from 'next/navigation'

interface PathsToPercentageType {
    [key: string]: string
};

export default function PlannerProgressBar() {
    const pathname = usePathname();

    const pathsToPercentage: PathsToPercentageType = {
        "/planner/goal": "w-1/4",
        "/planner/weeks": "w-2/4",
        "/planner/dates": "w-3/4",
        "/planner/review": "w-4/4",
        "/planner/result": "w-4/4",
    }

    return (
        <div className="h-4 w-1/4 bg-primary bg-opacity-25 rounded-3xl">
            <div className={`h-4 ${pathsToPercentage[pathname]} bg-primary rounded-3xl`} />
        </div>
    );
}
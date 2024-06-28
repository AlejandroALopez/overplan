"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useBadgesByUserId } from "@/hooks/queries";
import { useAppSelector } from "@/lib/store";
import { Badge } from "@/lib/types/planTypes";
import { badgeSelector } from "@/lib/constants/badgesConstants";
import Loading from "./loading";
import Error from "./error";

export default function MyBadges() {
    const userData = useAppSelector(state => state.session.userData);

    const [badges, setBadges] = useState<Badge[]>([]);

    const { isPending, error, data: badgesData } = useBadgesByUserId(userData?.userId || "");

    useEffect(() => {
        if(badgesData) setBadges(badgesData);
    }, [badgesData]);

    if (isPending) return (<Loading />)
    if (error) return (<Error />)

    return (
        <div className="flex flex-col w-full bg-white gap-16 p-8 min-h-screen">
            {/* Headings */}
            <div className="flex flex-col gap-4">
                <p className="text-3xl font-medium">My Badges</p>
                <p className="text-lg">Earn badges by successfully completing plans.</p>
            </div>
            {/* Badges */}
            <div className="grid lg:grid-cols-2 gap-12">
                {badges.map((badge) => (
                    <div 
                        key={badge._id}
                        className="flex flex-row gap-4"
                    >
                        <Image src={badgeSelector[badge.imageKey]} alt="blue badge" />
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-medium">{badge.goal}</p>
                            <p className="text-md">{badge.weeks} weeks</p>
                            <p className="text-md">Completed on: {badge.completionDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
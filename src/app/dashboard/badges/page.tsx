"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useBadgesByUserId } from "@/hooks/queries";
import { useAppSelector } from "@/lib/store";
import { Badge } from "@/lib/types/planTypes";
import { badgeSelector } from "@/lib/constants/badgesConstants";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "./loading";
import Error from "./error";

export default function MyBadges() {
    const queryClient = useQueryClient();
    const userData = useAppSelector(state => state.session.userData);

    const [badges, setBadges] = useState<Badge[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage: number = 6;
    const totalPages: number = Math.ceil(badges.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBadges = badges.slice(startIndex, startIndex + itemsPerPage);

    const { isPending, error, data: badgesData, isSuccess } = useBadgesByUserId(userData?.userId || "");

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    useEffect(() => {
        if (badgesData) setBadges(badgesData);
    }, [badgesData]);

    // TODO: Revise this
    if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['badges'] });
    }

    if (isPending) return (<Loading />)
    if (error) return (<Error />)

    return (
        <div className="flex flex-col w-full bg-white gap-12 p-8 min-h-screen">
            {/* Headings */}
            <div className="flex flex-col gap-4">
                <p className="text-3xl font-medium">My Badges</p>
                <p className="text-lg">Earn badges by successfully completing plans.</p>
            </div>
            {/* Badges */}
            <div className="h-3/4">
                <div className="grid lg:grid-cols-2 gap-12">
                    {currentBadges.map((badge) => (
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
            {/* Page Selector */}
            {totalPages > 0 && (
                <div className="flex flex-row items-center justify-center gap-4">
                    <button
                        className="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <p className="text-white">&lt;</p>
                    </button>
                    <span className="text-center w-24">Page {currentPage} of {totalPages}</span>
                    <button
                        className="px-4 py-2 bg-primary rounded disabled:opacity-50"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <p className="text-white">&gt;</p>
                    </button>
                </div>
            )}
        </div>
    );
}
'use client';

import Image from "next/image";
import Link from "next/link";
import ExpandDown from "../../../../public/icons/error.svg";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-white">
            <div className="flex flex-col items-center justify-center gap-8 bg-white w-full px-6 rounded-sm">
                <Image src={ExpandDown} alt="error icon" />
                <p className="text-3xl font-medium text-center">Whoops! There was a problem</p>
                <Link href="/planner/review">
                    <button
                        className={`px-6 py-4 border-none rounded-md bg-primary 
                                drop-shadow-lg transition hover:scale-110 duration-300`}
                    >
                        <p className="text-white text-lg sm:text-xl">&lt; Back to review</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}
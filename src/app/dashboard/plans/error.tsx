'use client';

import Image from "next/image";
import ExpandDown from "../../../../public/icons/error.svg";

export default function Error() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
            <div className="flex flex-col items-center justify-center gap-8 bg-white w-full px-6 rounded-sm">
                <Image src={ExpandDown} alt="error icon" />
                <p className="text-3xl font-medium text-center">Whoops! There was a problem</p>
                <p className="text-lg md:text-xl text-center">Try refreshing the page or contact support at {" "}
                    <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-primary font-medium">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a></p>
            </div>
        </div>
    )
}
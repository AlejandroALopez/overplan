'use client';

import PlannerProgressBar from "@/components/plannerProgressBar";
import { Montserrat } from "next/font/google";
import withAuth from "@/hoc/withAuth";
import NoTokensModal from "@/components/modals/noTokensModal";

const montserrat = Montserrat({ subsets: ["latin"] });

function PlannerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={montserrat.className}>
            <NoTokensModal />
            <div className="flex justify-center mt-8">
                <PlannerProgressBar />
            </div>
            {children}
        </div>
    );
}

export default withAuth(PlannerLayout);

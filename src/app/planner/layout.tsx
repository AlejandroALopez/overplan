import PlannerProgressBar from "@/components/plannerProgressBar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Planner",
    description: "Let the AI create a plan for you",
};

export default function PlannerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <div className="flex justify-center mt-8">
                    <PlannerProgressBar />
                </div>
                {children}
            </body>
        </html>
    );
}

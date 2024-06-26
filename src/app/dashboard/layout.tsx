'use client';

import { Montserrat } from "next/font/google";
import Navigation from "@/components/navigation";
import LoadingModal from "@/components/modals/loadingModal";
import ConfirmModal from "@/components/modals/confirmModal";
import SingleTaskModal from "@/components/modals/singleTaskModal";
import CreateTaskModal from "@/components/modals/createTaskModal";
import PlanCompletedModal from "@/components/modals/planCompletedModal";
import withAuth from "@/hoc/withAuth";

const montserrat = Montserrat({ subsets: ["latin"] });

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={`${montserrat.className}`}>
      <LoadingModal />
      <ConfirmModal />
      <SingleTaskModal />
      <CreateTaskModal />
      <PlanCompletedModal />
      <main className="bg-[#E6E6E6] flex flex-col sm:flex-row min-h-screen gap-1">
        <Navigation />
        {children}
      </main>
    </div>
  );
};

export default withAuth(DashboardLayout);

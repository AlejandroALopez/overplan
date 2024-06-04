

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navigation from "@/components/navigation";
import LoadingModal from "@/components/modals/loadingModal";
import ConfirmModal from "@/components/modals/confirmModal";
import SingleTaskModal from "@/components/modals/singleTaskModal";
import CreateTaskModal from "@/components/modals/createTaskModal";
import withAuth from "@/lib/utils/withAuth";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Keep track of the tasks for the week",
};

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <LoadingModal />
        <ConfirmModal />
        <SingleTaskModal />
        <CreateTaskModal />
        <main className="bg-[#E6E6E6] flex flex-col sm:flex-row min-h-screen gap-1">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
};

export default DashboardLayout;



import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Login or Signup to start using OverPlan AI",
};

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={`${montserrat.className}`}>
      <main className="bg-[#FAFAFA] flex flex-col min-h-screen p-8">
        <p className="text-3xl font-semibold">OverPlan AI</p>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

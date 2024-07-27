
import Image from "next/image";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Logo from '../../../public/logos/bigLogo.svg';

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
        {/* Logo */}
        <Image
          src={Logo}
          width={260}
          height={52}
          sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 5vw"
          alt="logo" />
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

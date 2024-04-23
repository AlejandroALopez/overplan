import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navigation from "@/components/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Keep track of the tasks for the week",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="flex flex-row min-h-screen gap-1">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}

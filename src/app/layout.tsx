import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OverPlan AI",
  description: "AI Goal Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ReactQueryClientProvider>
        <StoreProvider>
          <html lang="en">
            <body className={montserrat.className}>{children}</body>
          </html>
        </StoreProvider>
      </ReactQueryClientProvider>
  );
}

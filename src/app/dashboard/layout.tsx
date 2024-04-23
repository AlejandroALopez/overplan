import type { Metadata } from "next";
import Navigation from "@/components/navigation";

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
      <body>
        <main className="flex flex-row min-h-screen gap-1">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
}

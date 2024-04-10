import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "OverGoal Dashboard",
    description: "Custom description for dashboard",
  };

export default function Dashboard() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Hello, Dashboard page!</h1>
        </main>
    )
}
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Week",
    description: "Kanban Board with the tasks for the week",
  };

export default function Week() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Hello, Week page!</h1>
        </main>
    )
}
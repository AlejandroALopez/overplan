import Link from "next/link";

export default function Header() {
    return (
        <div className="flex flex-row w-full items-center text-center gap-16 py-4 px-8 bg-red-700">
            <Link href="/">
                <button className="text-white text-xl font-bold transition hover:scale-110 duration-300">Home</button>
            </Link>
            <Link href="/planner/goal">
                <button className="text-white text-xl font-bold transition hover:scale-110 duration-300">Create a Plan</button>
            </Link>
            <Link href="/week">
                <button className="text-white text-xl font-bold transition hover:scale-110 duration-300">My Week</button>
            </Link>
        </div>
    );
}
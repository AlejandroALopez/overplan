import Link from "next/link";
// import LoginButton from "./login-btn";

export default function Header() {
    return (
        <div className="flex flex-row w-full items-center text-center gap-16 py-4 px-8 bg-red-700">
            <Link href="/">
                <button className="text-white text-xl font-semibold transition hover:scale-110 duration-300">Home</button>
            </Link>
            <Link href="/planner/goal">
                <button className="text-white text-xl font-semibold transition hover:scale-110 duration-300">Create a Plan</button>
            </Link>
            <Link href="/dashboard/week">
                <button className="text-white text-xl font-semibold transition hover:scale-110 duration-300">My Week</button>
            </Link>
            <Link href="/auth/login">
                <button className="text-white text-xl font-semibold transition hover:scale-110 duration-300">Login</button>
            </Link>
            <Link href="/auth/register">
                <button className="text-white text-xl font-semibold transition hover:scale-110 duration-300">Register</button>
            </Link>
            {/* <LoginButton /> */}
        </div>
    );
}
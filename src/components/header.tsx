import Link from "next/link";

export default function Header() {
    return (
        <div className="Header">
            <Link href="/">
                <button className="header-button">Home</button>
            </Link>
            <Link href="/plan/goal">
                <button className="header-button">Create a Plan</button>
            </Link>
            <Link href="/week">
                <button className="header-button">My Week</button>
            </Link>
        </div>
    );
}
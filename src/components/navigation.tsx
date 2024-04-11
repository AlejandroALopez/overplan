import Link from "next/link";

export default function Navigation() {

  const app_name: string = "OverGoal AI";

  return (
    <div className="flex flex-col gap-8 m-0 p-8 bg-[#a52a2a] text-center min-h-full">
      <div className="flex text-center justify-center">
        <p className="text-xl text-white font-semibold">{app_name}</p>
      </div>
      <div className="flex text-center justify-center">
        <p className="text-xl text-white font-semibold">My Week</p>
      </div>
      <div className="flex text-center justify-center">
        <p className="text-xl text-white font-semibold">Plans</p>
      </div>
    </div>
  );
}
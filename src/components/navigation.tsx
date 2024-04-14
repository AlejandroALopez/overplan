import Link from "next/link";

export default function Navigation() {

  const app_name: string = "OverGoal AI";

  return (
    <div className="flex flex-col gap-8 m-0 w-1/6 py-8 bg-[#852222] text-center min-h-full">
      <div className="flex text-center justify-center">
        <p className="text-xl text-white font-semibold">{app_name}</p>
      </div>
      <div className="flex flex-col gap-12 my-12">
        <div className="flex flex-row items-center justify-center py-4 bg-gray-400">
          <p className="text-xl text-white font-semibold">My Week</p>
        </div>
        <div className="flex flex-row items-center justify-center py-4 bg-gray-400">
          <p className="text-xl text-white font-semibold">Plans</p>
        </div>
      </div>
    </div>
  );
}
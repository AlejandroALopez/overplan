import Link from "next/link";
import Image from "next/image";
import Home from "../../public/icons/home.svg";
import Map from "../../public/icons/map.svg";

export default function Navigation() {

  const app_name: string = "OverPlan AI";

  return (
    <div className="flex flex-col gap-8 m-0 w-1/6 py-8 bg-white text-center min-h-full">
      <div className="flex text-center justify-center">
        <p className="text-2xl font-semibold">{app_name}</p>
      </div>
      <div className="flex flex-col items-center gap-4 mt-2">
        <div className="flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-primary bg-opacity-10 rounded-sm">
          <Image src={Home} alt="my weeks icon" />
          <p className="font-medium">My Week</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 w-11/12 py-3 bg-white rounded-sm">
          <Image src={Map} alt="my plans icon" />
          <p className="font-medium">My Plans</p>
        </div>
      </div>
    </div>
  );
}
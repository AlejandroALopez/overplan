import { PlanProgressProps, SmallPlanProgressProps } from "@/lib/types/extraProps";
import { Plan } from "@/lib/types/planTypes";

// Progress bar for active Plan. Fill determined by tasks completed over total
export const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row gap-4 items-center">
            <div className="h-5 w-5/12 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="text-2xl">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

// Progress bar for plan option on selector
const SmallProgressBar: React.FC<SmallPlanProgressProps> = ({ prog, week }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row gap-2 items-center">
            <p className="w-10 text-lg">W{week}</p>
            <div className="h-4 w-36 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="w-10 text-lg">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

// Change active plan
export const PlanSelector: React.FC = () => {
    const plansData: Plan[] = [{
        slug: "write-an-essay-about-a-book",
        userId: "userId1",
        goal: "Write an essay about a book",
        numWeeks: 3,
        currWeek: 1,
        weekProg: 0,
        startDate: "2024-05-03",
        weekEndDate: "Friday, May 10",
        _id: "663558a7befb09cc3437dd50",
        active: true,
        completed: false,
    },
    {
        slug: "another-test-plan",
        userId: "userId1",
        goal: "Test plan",
        numWeeks: 4,
        currWeek: 2,
        weekProg: 0.5,
        startDate: "2024-05-03",
        weekEndDate: "Friday, May 10",
        _id: "admi23i023nn2i03dm23d",
        active: true,
        completed: false,
    }
    ];

    const selectPlan = () => {
        console.log("Change to this plan");
    }

    return (
        <div className="absolute z-10 w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-white border-2 border-[#E6E6E6] shadow-md px-4 py-2 mt-20 rounded-md">
            {plansData.map((plan: Plan) => (
                <button
                    key={plan._id}
                    onClick={() => selectPlan()}
                    className="flex flex-row items-center justify-between w-full border-b border-gray-200 px-1 py-1.5 rounded-md
                    cursor-pointer hover:bg-primary hover:bg-opacity-10 duration-300">
                    <p>{plan.goal}</p>
                    <SmallProgressBar prog={plan.weekProg} week={plan.currWeek} />
                </button>
            ))}
        </div>
    );
}

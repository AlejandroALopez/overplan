import { PlanProgressProps, PlanSelectorProps, SmallPlanProgressProps } from "@/lib/types/extraProps";
import { Plan } from "@/lib/types/planTypes";

// Progress bar for active Plan. Fill determined by tasks completed over total
export const ProgressBar: React.FC<PlanProgressProps> = ({ prog }) => {
    const progressBarStyle: React.CSSProperties = {
        width: `${prog * 100}%`,
    };

    return (
        <div className="flex flex-row gap-4 items-center justify-center sm:justify-normal">
            <div className="h-5 w-9/12 sm:w-6/12 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="text-xl sm:text-2xl">{(prog * 100).toFixed(0)}%</p>
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
            <p className="w-10 text-auto md:text-lg">W{week}</p>
            <div className="h-4 w-72 md:w-36 bg-primary bg-opacity-25 rounded-3xl">
                <div className="h-full bg-primary rounded-3xl" style={progressBarStyle} />
            </div>
            <p className="w-10 text-auto md:ext-lg">{(prog * 100).toFixed(0)}%</p>
        </div>
    )
}

// Change active plan
export const PlanSelector: React.FC<PlanSelectorProps> = ({ onSelect, plans, activePlanId }) => {

    const selectPlan = (plan: Plan) => {
        onSelect(plan);
    }

    return (
        <div
            className="absolute top-[150px] sm:top-[100px] flex flex-col overflow-y-scroll z-10 h-36 w-11/12 sm:w-8/12 md:w-7/12 lg:w-6/12 
            bg-white border-2 border-[#E6E6E6] shadow-md px-4 py-2 rounded-md"
        >
            {plans.map((plan: Plan) => {
                if (plan._id !== activePlanId) {
                    return (
                        <button
                            key={plan._id}
                            onClick={() => selectPlan(plan)}
                            className="flex flex-col md:flex-row md:items-center justify-between w-full border-b border-gray-200 px-1 py-1.5 rounded-md gap-4
                        cursor-pointer hover:bg-primary hover:bg-opacity-10 duration-300">
                            <p className="text-left">{plan.goal}</p>
                            <SmallProgressBar prog={plan.weekProg} week={plan.currWeek} />
                        </button>
                    )
                }
            })}
        </div>
    );
}

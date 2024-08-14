import { Plan } from "./planTypes";

export interface PlanProgressProps {
  prog: number; // 0 to 1, for percentage
}

export interface SmallPlanProgressProps { // for Plan option on selector
  week: number;
  prog: number;
}

export interface PlanSelectorProps {
  onSelect: ((selectedPlan: Plan) => void);
  plans: Plan[];
  activePlanId: string;
}
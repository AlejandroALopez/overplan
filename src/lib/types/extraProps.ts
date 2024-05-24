import { Plan } from "./planTypes";

export interface PlanProgressProps {
  prog: number;
}

export interface SmallPlanProgressProps {
  week: number;
  prog: number;
}

export interface PlanSelectorProps {
  onSelect: ((selectedPlan: Plan) => void);
  plans: Plan[];
  activePlanId: string;
}
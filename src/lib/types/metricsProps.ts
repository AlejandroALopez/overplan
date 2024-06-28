import { Plan, ITask } from "./planTypes";

export interface TopMetricsProps {
  plan: Plan | null;
  tasks: ITask[];
}

import { Plan, Task } from "./planTypes";

export interface TopMetricsProps {
  plan: Plan | null;
  tasks: Task[];
}

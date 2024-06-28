export interface ITask {
  _id: string;
  title: string;
  description: string;
  planId: string;
  week: number;
  status: string;
  completionDate: string | null;
}

export interface Week {
  [k: string]: string[];
}

export interface IMoveTasksInput {
  planId: string;
  week: number;
}

// For POST and PUT requests
export interface ITaskInput {
  title?: string;
  description?: string;
  planId?: string;
  week?: number;
  status?: string;
  completionDate?: string | null;
}

export interface UpdateTaskMutationInput {
  id: string;
  taskInput: ITaskInput;
}

// For POST and PUT requests
export interface IPlanInput {
  slug?: string;
  userId?: string;
  goal?: string;
  numWeeks?: number;
  currWeek?: number;
  weekProg?: number;
  startDate?: string;
  weekEndDate?: string;
  active?: boolean;
  completed?: boolean;
}

export interface Plan {
  _id: string;
  slug: string;
  userId: string;
  goal: string;
  numWeeks: number;
  currWeek: number;
  weekProg: number;
  startDate: string;
  weekEndDate: string;
  active: boolean;
  completed: boolean;
}

export interface PlanResult {
  goal: string;
  numWeeks: number;
  tasks: ITask[]; // ordered by week using a function
}

export interface Badge {
  _id: string;
  goal: string;
  weeks: number;
  userId: string;
  imageKey: string;
  completionDate: string;
  planId: string;
}

// For POST and PUT requests
export interface IBadgeInput {
  goal: string;
  weeks: number;
  userId: string;
  imageKey: string;
  completionDate: string;
  planId: string;
}

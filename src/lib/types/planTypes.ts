export interface Task {
    _id: string,
    title: string,
    description: string,
    week: number,
    status: string, // TODO: Switch to enum later
}

export interface Week {
    [k: string]: string[],
}

export interface Plan {
    id: string,
    user_id: string,
    goal: string,
    weeksTotal: number,
    weeksCompleted: number,
}

export interface PlanResult {
    goal: string,
    numWeeks: number,
    tasks: Task[], // ordered by week using a function
}
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
    _id: string,
    slug: string,
    userId: string,
    goal: string,
    numWeeks: number,
    currWeek: number,
    weekProg: number,
    weekEndDate: string,
}

export interface PlanResult {
    goal: string,
    numWeeks: number,
    tasks: Task[], // ordered by week using a function
}
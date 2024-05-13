export interface Task {
    _id: string,
    title: string,
    description: string,
    week: number,
    status: string,
}

export interface Week {
    [k: string]: string[],
}

// For POST and PUT requests
export interface IPlanInput {
    slug?: string,
    userId?: string,
    goal?: string,
    numWeeks?: number,
    currWeek?: number,
    weekProg?: number,
    startDate?: string,
    weekEndDate?: string,
    active?: boolean,
    completed?: boolean,
}

export interface Plan {
    _id: string,
    slug: string,
    userId: string,
    goal: string,
    numWeeks: number,
    currWeek: number,
    weekProg: number,
    startDate: string,
    weekEndDate: string,
    active: boolean,
    completed: boolean,
}

export interface PlanResult {
    goal: string,
    numWeeks: number,
    tasks: Task[], // ordered by week using a function
}
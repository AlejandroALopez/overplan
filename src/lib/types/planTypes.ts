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

export interface IPlanInput {
    slug: string,
    userId: string,
    goal: string,
    numWeeks: number,
    currWeek: number,
    weekProg: number,
    startDate: string,
    weekEndDate: string,
}

export interface Plan extends IPlanInput {
    _id: string,
}

export interface PlanResult {
    goal: string,
    numWeeks: number,
    tasks: Task[], // ordered by week using a function
}
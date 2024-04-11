export interface Task {
    id: string,
    title: string,
    description: string,
    week: number,
    status: string, // TODO: Switch to enum later
}

export interface Week {
    [k: string]: string[],
}

export interface Plan {
    goal: string,
    numWeeks: number,
    tasks: Task[], // ordered by week using a function
}
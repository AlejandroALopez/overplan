

interface Plan {
    id: string,
    goal: string,
    numWeeks: number,
    currWeek: number,
    weekProg: number,
    weekEndDate: string,
}

export interface PlanProgressProps {
    prog: number,
}

export const plansData: Plan[] = [
    {
        id: "n0i2nn20fn2903n23",
        goal: "Learn Python",
        numWeeks: 4,
        currWeek: 1,
        weekProg: 0.5,
        weekEndDate: "Monday, Oct 7th", 
    },
    {
        id: "inv93734h89023iwni9wendk2",
        goal: "Run 5 miles/day",
        numWeeks: 5,
        currWeek: 3,
        weekProg: 0.9,
        weekEndDate: "Wednesday, Oct 2th", 
    },
    {
        id: "in2icnbubcnci0",
        goal: "Analyze a scientific paper",
        numWeeks: 4,
        currWeek: 4,
        weekProg: 0.25,
        weekEndDate: "Saturday, Oct 5th", 
    },
]
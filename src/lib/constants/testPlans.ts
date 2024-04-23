interface Plan {
  id: string;
  slug: string;
  goal: string;
  numWeeks: number;
  currWeek: number;
  weekProg: number;
  weekEndDate: string;
}

export interface PlanProgressProps {
  prog: number;
}

export const singlePlanTest: Plan = {
  id: "n0i2nn20fn2903n23",
  slug: "learn-python",
  goal: "Learn Python",
  numWeeks: 4,
  currWeek: 1,
  weekProg: 0.5,
  weekEndDate: "Monday, Oct 7th",
};

export const plansData: Plan[] = [
  {
    id: "n0i2nn20fn2903n23",
    slug: "learn-python",
    goal: "Learn Python",
    numWeeks: 4,
    currWeek: 1,
    weekProg: 0.5,
    weekEndDate: "Monday, Oct 7th",
  },
  {
    id: "inv93734h89023iwni9wendk2",
    slug: "run-5-miles-a-day",
    goal: "Run 5 miles/day",
    numWeeks: 5,
    currWeek: 3,
    weekProg: 0.9,
    weekEndDate: "Wednesday, Oct 2th",
  },
  {
    id: "in2icnbubcnci0",
    slug: "analyze-a-scientific-paper",
    goal: "Analyze a scientific paper",
    numWeeks: 4,
    currWeek: 4,
    weekProg: 0.25,
    weekEndDate: "Saturday, Oct 5th",
  },
];

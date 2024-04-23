import { Dispatch, SetStateAction } from 'react';
import { Task } from './planTypes';

export interface GoalIdeaProps {
    idea: string;
    index: number;
    setSelectedGoal: Dispatch<SetStateAction<string>>;
}

export interface WeekOptionProps {
    weeks: number;
    setWeeks: Dispatch<SetStateAction<number>>;
}

export interface WeekProps {
    week: number;
    activeWeek: number;
    setActiveWeek: Dispatch<SetStateAction<number>>;
}

export interface TaskProps {
    task: Task
}
import { Dispatch, SetStateAction } from 'react';
import { Task } from './planTypes';

export interface WeekOptionProps {
    weeks: number;
    setWeeks: Dispatch<SetStateAction<number>>;
}

export interface WeekProps {
    week: number;
    activeWeek: number;
    setActiveWeek: Dispatch<SetStateAction<number>>;
}

export interface WeekSelectorProps {
    activeWeek: number;
    setActiveWeek: Dispatch<SetStateAction<number>>;
    weeksArray: null[];
    filteredTasks: Task[];
}

export interface TaskProps {
    task: Task
}
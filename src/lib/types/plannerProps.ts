import { Dispatch, SetStateAction } from 'react';

export interface GoalIdeaProps {
    idea: string;
    index: number;
    setSelectedGoal: Dispatch<SetStateAction<string>>;
}

export interface WeekOptionProps {
    option: number;
    selectedTime: number;
    setSelectedTime: Dispatch<SetStateAction<number>>;
}

export interface WeekProps {
    week: number;
    activeWeek: number;
    setActiveWeek: Dispatch<SetStateAction<number>>;
}

export interface TaskProps {
    key: number,
    title: string,
}
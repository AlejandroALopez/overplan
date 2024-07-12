import { Dispatch, SetStateAction } from 'react';
import { ITask } from "./planTypes";

export type HandleDragStartFunction = (e: React.DragEvent<HTMLDivElement>, card: ITask) => void;
export type DragFunction = (e: React.DragEvent<HTMLDivElement>) => void;
export type UpdateFunction = (newProg: number) => void;

export interface ColumnProps {
    column: string,
    cards: ITask[],
    setCards: Dispatch<SetStateAction<ITask[]>>;
    updateFn: UpdateFunction;
    completedTasks: number;
}

export interface DropIndicatorProps {
    beforeId: string,
    column: string,
}

export interface CardProps {
    task: ITask,
    handleDragStart: HandleDragStartFunction,
}

export interface ColumnColorsType {
    [key: string]: string;
}

export interface KanbanProps {
    cards: ITask[],
    setCards: Dispatch<SetStateAction<ITask[]>>;
    updateFn: UpdateFunction;
    completedTasks: number;
}
import { Dispatch, SetStateAction } from 'react';
import { Task } from "./planTypes";

export interface ColumnProps {
    column: string,
    cards: Task[],
    setCards: Dispatch<SetStateAction<Task[]>>;
}

export interface DropIndicatorProps {
    beforeId: string,
    column: string,
}

export type HandleDragStartFunction = (e: React.DragEvent<HTMLDivElement>, card: Task) => void;
export type DragFunction = (e: React.DragEvent<HTMLDivElement>) => void;

export interface CardProps {
    task: Task,
    handleDragStart: HandleDragStartFunction,
}
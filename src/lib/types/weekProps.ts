import { Dispatch, SetStateAction } from 'react';
import { ITask } from "./planTypes";

export interface ColumnProps {
    column: string,
    cards: ITask[],
    setCards: Dispatch<SetStateAction<ITask[]>>;
}

export interface DropIndicatorProps {
    beforeId: string,
    column: string,
}

export type HandleDragStartFunction = (e: React.DragEvent<HTMLDivElement>, card: ITask) => void;
export type DragFunction = (e: React.DragEvent<HTMLDivElement>) => void;

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
}
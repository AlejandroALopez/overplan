"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ColumnProps, DropIndicatorProps, CardProps, HandleDragStartFunction, DragFunction } from '@/lib/types/weekProps';
import { Task } from "@/lib/types/planTypes";
import { testPlan1 } from "@/lib/constants/testData";
import Navigation from "@/components/navigation";


const Column: React.FC<ColumnProps> = ({ column, cards, setCards }) => {
    const [active, setActive] = useState<boolean>(false);
    const filteredCards = cards.filter((c) => c.status === column);

    const handleDragStart: HandleDragStartFunction = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragOver: DragFunction = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        ; setActive(true);
    }

    const highlightIndicator: DragFunction = (e) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else return closest;
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    // Get specific column for highlight
    const getIndicators = () => {
        return Array.from(document.querySelectorAll<HTMLElement>(`[data-column="${column}"]`));
    };

    const handleDragLeave: DragFunction = () => {
        setActive(false);
        clearHighlights();
    };

    const handleDragEnd: DragFunction = (e) => {
        setActive(false);
        clearHighlights();

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
        const before = element.dataset.before || "-1"; // card nearest to where we hover

        if (before !== cardId) { // if same card, don't do anything + double check
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;

            cardToTransfer = { ...cardToTransfer, status: column } // update status of card

            copy = copy.filter((c) => c.id !== cardId); // filter out that card (remove copy)

            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    }

    return (
        <div key={column} className="flex flex-col shrink-0 bg-[#f08080] w-64 h-full text-center">
            <div className="flex flex-row items-center justify-between p-4">
                <p>{column}</p>
                <span>{filteredCards.length} items</span>
            </div>
            <div
                className={`w-full h-full ${active ? "bg-[#282828] col-active opacity-50" : "bg-black"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
            >
                {filteredCards.map((c) => <Card key={c.id} task={c} handleDragStart={handleDragStart} />)}
                <DropIndicator beforeId="-1" column={column} />
            </div>
        </div>
    )
}

const Card: React.FC<CardProps> = ({ task, handleDragStart }) => {

    // Help sync event types between React and Framer Motion
    const onDragStartHandler = (event: MouseEvent | TouchEvent | PointerEvent) => {
        if ((event.target as HTMLElement).getAttribute('draggable') === 'true') {
            handleDragStart(event as unknown as React.DragEvent<HTMLDivElement>, task);
        }
    };

    return (
        <>
            <DropIndicator beforeId={task.id} column={task.status} />
            <motion.div
                layout
                layoutId={task.id}
                className="bg-blue-700 p-2 cursor-grab active:cursor-grabbing"
                draggable="true"
                onDragStart={onDragStartHandler}
            >
                <p className="text-white">{task.title}</p>
            </motion.div>
        </>
    );
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
    return (
        <div
            className="my-0.5 h-0.5 w-full bg-[#a78bfa] opacity-0"
            data-before={beforeId || "-1"}
            data-column={column}
        />
    )
}

export default function Week() {
    const goal: string = "My Goal";
    const weekNumber: number = 1;

    const [cards, setCards] = useState<Task[]>(testPlan1.tasks);

    // className="flex min-h-screen flex-col items-center justify-between p-24"

    return (
        <main className="flex flex-row min-h-screen">
            <Navigation />
            <div className="w-full p-8">
                <div className="flex flex-col">
                    <p className="text-black">{goal}</p>
                    <p className="text-black">Week {weekNumber}</p>
                </div>
                <div className="flex flex-row justify-between my-8 h-5/6">
                    <Column column={"Backlog"} cards={cards} setCards={setCards} />
                    <Column column={"Active"} cards={cards} setCards={setCards} />
                    <Column column={"In Progress"} cards={cards} setCards={setCards} />
                    <Column column={"Completed"} cards={cards} setCards={setCards} />
                </div>
            </div>
        </main>
    );
}
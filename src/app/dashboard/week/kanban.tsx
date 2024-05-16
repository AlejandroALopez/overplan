import { useState } from "react";
import { motion } from "framer-motion";
import { ColumnProps, DropIndicatorProps, CardProps, KanbanProps,
    HandleDragStartFunction, DragFunction, ColumnColorsType 
} from '@/lib/types/weekProps';

// Match column names with their respective colors
const column_text_colors: ColumnColorsType = {
    "Backlog": "text-taskBacklog",
    "Active": "text-taskActive",
    "In Progress": "text-taskInProgress",
    "Completed": "text-taskCompleted",
}

const column_bg_colors: ColumnColorsType = {
    "Backlog": "bg-taskBacklog",
    "Active": "bg-taskActive",
    "In Progress": "bg-taskInProgress",
    "Completed": "bg-taskCompleted",
}

const column_border_colors: ColumnColorsType = {
    "Backlog": "border-taskBacklog",
    "Active": "border-taskActive",
    "In Progress": "border-taskInProgress",
    "Completed": "border-taskCompleted",
}

const Column: React.FC<ColumnProps> = ({ column, cards, setCards }) => {
    const [active, setActive] = useState<boolean>(false);
    const filteredCards = cards.filter((c) => c.status === column);

    const handleDragStart: HandleDragStartFunction = (e, card) => {
        e.dataTransfer.setData("cardId", card._id);
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

            let cardToTransfer = copy.find((c) => c._id === cardId);
            if (!cardToTransfer) return;

            cardToTransfer = { ...cardToTransfer, status: column } // update status of card

            copy = copy.filter((c) => c._id !== cardId); // filter out that card (remove copy)

            const moveToBack = before === "-1";
            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el._id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    }

    return (
        <div key={column} className="flex flex-col shrink-0 w-64 h-full text-center">
            <div className="flex flex-row items-center justify-between py-2">
                <p className={`text-xl ${column_text_colors[column]}`}>{column}</p>
                <p className={`text-xl ${column_text_colors[column]}`}>{filteredCards.length}</p>
            </div>
            <div
                className={`w-full h-full ${column_bg_colors[column]} bg-opacity-5 border-[1px] rounded-md p-2
                    ${column_border_colors[column]} ${active && "col-active opacity-50"} `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
            >
                {filteredCards.map((c) => <Card key={c._id} task={c} handleDragStart={handleDragStart} />)}
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
            <DropIndicator beforeId={task._id} column={task.status} />
            <motion.div
                layout
                layoutId={task._id}
                className="flex flex-col text-left items-end bg-white border-2 border-[#EDEDED]
                    rounded-md rounded-br-xl cursor-grab active:cursor-grabbing"
                draggable="true"
                onDragStart={onDragStartHandler}
            >
                <p className="w-full p-2">{task.title}</p>
                <div className={`h-4 w-6 rounded-tl-md rounded-br-xl ${column_bg_colors[task.status]}`} />
            </motion.div>
        </>
    );
}

const DropIndicator: React.FC<DropIndicatorProps> = ({ beforeId, column }) => {
    return (
        <div
            className="my-0.5 h-0.5 w-full bg-primary opacity-0"
            data-before={beforeId || "-1"}
            data-column={column}
        />
    )
}

export const Kanban: React.FC<KanbanProps> = ({ cards, setCards }) => {
    return (
        <div className="flex flex-row justify-between bg-white p-6 h-5/6 rounded-sm">
            <Column column={"Backlog"} cards={cards} setCards={setCards} />
            <Column column={"Active"} cards={cards} setCards={setCards} />
            <Column column={"In Progress"} cards={cards} setCards={setCards} />
            <Column column={"Completed"} cards={cards} setCards={setCards} />
        </div>
    )
}
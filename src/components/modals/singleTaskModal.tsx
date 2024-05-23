"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsSingleTaskOpen, setSelectedTask } from "@/lib/store/modalSlice";
import { useState } from "react";
import EditIcon from "../../../public/icons/edit.svg";
import DeleteIcon from "../../../public/icons/delete.svg";
import CloseIcon from "../../../public/icons/close.svg";
import { ColumnColorsType } from "@/lib/types/weekProps";

const column_text_colors: ColumnColorsType = {
    "Backlog": "text-taskBacklog",
    "Active": "text-taskActive",
    "In Progress": "text-taskInProgress",
    "Completed": "text-taskCompleted",
}

export default function SingleTaskModal() {
    const dispatch = useAppDispatch();
    const { isSingleTaskOpen, selectedTask } = useAppSelector(state => state.modal);
    const [editMode, setEditMode] = useState<boolean>(false);

    const closeModal = () => {
        dispatch(setIsSingleTaskOpen(false));
        dispatch(setSelectedTask(null));
    }

    // Execute function passed to modal
    const handleDelete = () => {
        console.log("TODO: delete task");
    };

    if (!isSingleTaskOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div onClick={closeModal} className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-7/12 mx-auto p-6">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-xl text-[#999999] text-center">Task</p>
                    <button
                        className="transition hover:scale-110 duration-300"
                        onClick={closeModal}
                    >
                        <Image src={CloseIcon} alt={"Close icon"} />
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between mt-2">
                    <p className="text-2xl font-medium mt-2">{selectedTask?.title}</p>
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={() => setEditMode(!editMode)}
                            className={`flex flex-row items-center gap-2 py-1.5 px-4 border-none rounded-md bg-[#E4E4E4] 
                            drop-shadow-lg transition hover:scale-110 duration-300`}
                        >
                            <Image src={EditIcon} alt="Edit icon" />
                            <p className="text-lg">{editMode ? "cancel" : "edit"}</p>
                        </button>
                        <button
                            onClick={handleDelete}
                            className={`flex flex-row items-center gap-2 py-1.5 px-4 border-none rounded-md bg-[#E4E4E4] 
                        drop-shadow-lg transition hover:scale-110 duration-300`}
                        >
                            <Image src={DeleteIcon} alt="Delete icon" />
                            <p className="text-lg">delete</p>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-16 mt-4">
                    <div className="flex flex-row gap-2">
                        <p className="text-[#999999]">Week:</p>
                        <p>{selectedTask?.week}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p className="text-[#999999]">Status:</p>
                        <p className={`font-medium ${column_text_colors[selectedTask?.status || ""]}`}>{selectedTask?.status}</p>
                    </div>
                    {selectedTask?.completionDate && (
                        <div className="flex flex-row gap-2">
                            <p className="text-[#999999]">Completed on:</p>
                            <p>{selectedTask?.completionDate}</p>
                        </div>
                    )}
                </div>
                <p className="text-xl text-[#999999] mt-4">Description</p>
                <div className="mt-2 w-3/4">
                    {selectedTask?.description || "No description given"}
                </div>
            </div>
        </div>
    )
}
"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsSingleTaskOpen, setSelectedTask } from "@/lib/store/modalSlice";
import { useEffect, useState } from "react";
import EditIcon from "../../../public/icons/edit.svg";
import DeleteIcon from "../../../public/icons/delete.svg";
import CloseIcon from "../../../public/icons/close.svg";
import { ColumnColorsType } from "@/lib/types/weekProps";
import { ITaskInput } from "@/lib/types/planTypes";
import { updateTask } from "@/lib/api/tasksApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const column_text_colors: ColumnColorsType = {
    "Backlog": "text-taskBacklog",
    "Active": "text-taskActive",
    "In Progress": "text-taskInProgress",
    "Completed": "text-taskCompleted",
}

export default function SingleTaskModal() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const activePlanId = useAppSelector(state => state.session.user.activePlanId);
    const { isSingleTaskOpen, selectedTask } = useAppSelector(state => state.modal);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [titleVal, setTitleVal] = useState<string>(selectedTask?.title || "");
    const [descriptionVal, setDescriptionVal] = useState<string>(selectedTask?.description || "");

    const updateTaskMutation = useMutation({
        mutationFn: (taskInput: ITaskInput) => {
            return updateTask(selectedTask?._id || "", taskInput);
        },
        onError: () => {
            console.log('Error updating plan');
            // dispatch(setIsLoading(false));
        },
    });

    const closeModal = () => {
        dispatch(setIsSingleTaskOpen(false));
        dispatch(setSelectedTask(null));
    }

    const handleEdit = async () => {
        if (editMode) { // save edits
            const body = {
                title: titleVal,
                description: descriptionVal,
            }

            try{
                await updateTaskMutation.mutateAsync(body);

                // fetch week tasks again
                await queryClient.invalidateQueries({ queryKey: ['weekTasks', activePlanId] });
            } catch (error) {
                console.log('Error updating task', error);
            }
        }
        setEditMode(!editMode);
    }

    // Execute function passed to modal
    const handleDelete = () => {
        console.log("TODO: delete task");
    };

    useEffect(() => {
        setTitleVal(selectedTask?.title || "");
        setDescriptionVal(selectedTask?.description || "");
    }, [selectedTask])

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
                    {editMode
                        ? (
                            <input
                                className="w-7/12 text-lg text-gray-600 px-4 py-2 font-medium mt-2 border-[#808080] border-[1px] rounded-md bg-[#A6A6A6] bg-opacity-25"
                                value={titleVal}
                                onChange={e => setTitleVal(e.target.value)}
                            />
                        )
                        : (
                            <p className="text-2xl font-medium mt-2">{titleVal}</p>
                        )
                    }
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={handleEdit}
                            className={`flex flex-row items-center gap-2 py-1.5 px-4 border-none rounded-md bg-[#E4E4E4] 
                            drop-shadow-lg transition hover:scale-110 duration-300`}
                        >
                            <Image src={EditIcon} alt="Edit icon" />
                            <p className="text-lg">{editMode ? "save" : "edit"}</p>
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
                    {editMode
                        ? (
                            <textarea
                                className="w-full text-lg text-gray-600 px-4 py-2 font-medium mt-2 border-[#808080] border-[1px] rounded-md bg-[#A6A6A6] bg-opacity-25"
                                value={descriptionVal}
                                onChange={e => setDescriptionVal(e.target.value)}
                            />
                        )
                        : (
                            <p>{descriptionVal || "No description given"}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
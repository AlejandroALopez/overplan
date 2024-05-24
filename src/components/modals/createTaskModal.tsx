"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsCreateTaskOpen } from "@/lib/store/modalSlice";
import { useState } from "react";
import CloseIcon from "../../../public/icons/close.svg";
import { ITaskInput } from "@/lib/types/planTypes";
import { createTask } from "@/lib/api/tasksApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function CreateTaskModal() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const activePlan = useAppSelector(state => state.plan.activePlan);
    const isCreateTaskOpen = useAppSelector(state => state.modal.isCreateTaskOpen);

    const [titleVal, setTitleVal] = useState<string>("");
    const [descriptionVal, setDescriptionVal] = useState<string>("");
    const [isProcessUp, setIsProcessUp] = useState<boolean>(false);

    const createTaskMutation = useMutation({
        mutationFn: (taskInput: ITaskInput) => {
            return createTask(taskInput);
        },
        onError: () => {
            console.log('Error creating plan');
        },
    });

    const closeModal = () => {
        dispatch(setIsCreateTaskOpen(false));
    }

    // Disabled button if values missing or after activating it
    const isDisabled = () => {
        return (titleVal === "" || descriptionVal === "") || isProcessUp;
    }

    const handleCreateTask = async () => {
        setIsProcessUp(true);

        if (!activePlan) {
            console.log('Error: No Active Plan found');
            setIsProcessUp(false);
            return;
        }

        const body = {
            title: titleVal,
            description: descriptionVal,
            planId: activePlan._id,
            week: activePlan.currWeek || 1,
        }

        try {
            await createTaskMutation.mutateAsync(body);

            // fetch week tasks again
            await queryClient.invalidateQueries({ queryKey: ['weekTasks', activePlan._id] });
        } catch (error) {
            console.log('Error creating task', error);
        }

        closeModal();
        setIsProcessUp(false);
    };

    if (!isCreateTaskOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div onClick={closeModal} className="absolute inset-0 bg-white bg-opacity-75"></div>
            <div className="relative bg-white rounded-lg shadow-lg w-7/12 mx-auto p-6">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-3xl font-medium">New Task</p>
                    <button
                        className="transition hover:scale-110 duration-300"
                        onClick={closeModal}
                    >
                        <Image src={CloseIcon} alt={"Close icon"} />
                    </button>
                </div>
                <div className="flex flex-row gap-2 mt-2">
                    <p className="text-lg text-[#999999]">Plan:</p>
                    <p className="text-lg font-medium">{activePlan?.goal}</p>
                </div>
                <div className="flex flex-row gap-2 mt-2">
                    <p className="text-lg text-[#999999]">Week:</p>
                    <p className="text-lg font-medium">{activePlan?.currWeek || 1}</p>
                </div>
                <input
                    className="w-7/12 text-lg text-gray-600 px-4 py-2 font-medium mt-2 border-[#808080] border-[1px] rounded-md bg-[#A6A6A6] bg-opacity-25"
                    placeholder="Title for your task"
                    value={titleVal}
                    onChange={e => setTitleVal(e.target.value)}
                />
                <textarea
                    className="w-full text-lg text-gray-600 px-4 py-2 font-medium mt-4 border-[#808080] 
                        border-[1px] rounded-md bg-[#A6A6A6] bg-opacity-25"
                    placeholder="A helpful description"
                    value={descriptionVal}
                    onChange={e => setDescriptionVal(e.target.value)}
                />
                <div className="flex flex-row justify-end">
                    <button
                        className={`py-4 px-6 mt-4 border-none rounded-md bg-primary text-white text-lg drop-shadow-lg 
                        transition hover:scale-110 duration-300 ${(isDisabled()) && "opacity-50"}`}
                        disabled={isDisabled()}
                        onClick={() => handleCreateTask()}
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    )
}
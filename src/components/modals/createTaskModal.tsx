"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setIsCreateTaskOpen, setIsLoading } from "@/lib/store/modalSlice";
import { useState } from "react";
import CloseIcon from "../../../public/icons/close.svg";
import { IPlanInput, ITaskInput } from "@/lib/types/planTypes";
import { createTask } from "@/lib/api/tasksApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setActivePlan, setNumTasks } from "@/lib/store/planSlice";
import { updatePlan } from "@/lib/api/plansApi";


export default function CreateTaskModal() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const activePlan = useAppSelector(state => state.plan.activePlan);
    const numTasks = useAppSelector(state => state.plan.numTasks); // useful for updating week prog on task creation
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        }
    });

    const updatePlanMutation = useMutation({
        mutationFn: (planInput: IPlanInput) => {
            return updatePlan(activePlan?._id || "", planInput);
        },
        onError: () => {
            console.log('Error updating plan');
            dispatch(setIsLoading(false));
        },
        onSuccess: () => {
            if (updatePlanMutation.data) {
                dispatch(setActivePlan(updatePlanMutation.data));
            }
        }
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

            // Update week progress
            const numComplete = Math.ceil(activePlan.weekProg * numTasks);
            const newProg = parseFloat((numComplete / (numTasks + 1)).toFixed(2));

            await updatePlanMutation.mutateAsync({ weekProg: newProg });

            dispatch(setNumTasks(numTasks + 1));
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
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-7/12 mx-auto p-6">
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
                <textarea
                    className="w-full md:w-7/12 text-lg px-4 py-2 mt-2 font-medium border-[#808080] border-[1px] rounded-md"
                    placeholder="Title for your task"
                    value={titleVal}
                    onChange={e => setTitleVal(e.target.value)}
                />
                <textarea
                    className="w-full text-lg px-4 py-2 mt-4 border-[#808080] border-[1px] rounded-md"
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
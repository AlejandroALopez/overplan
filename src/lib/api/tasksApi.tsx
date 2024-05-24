import axios from "axios";
import { IMoveTasksInput, ITaskInput, Task } from "../types/planTypes";

// Get tasks by planId and week
export const fetchTasksByPlanId = async (planId: string, week?: number) => {
    const URL = 'http://localhost:8080/tasks?' + `planId=${planId}` + `${week ? `&week=${week}` : ''}`

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks data');
    }
    return response.json();
};

// Create task and return it
export const createTask = async (taskBody: ITaskInput) => {
    const URL = 'http://localhost:8080/tasks';
    try {
        const response = await axios.post(URL, taskBody);
        return response.data;
    } catch (error) {
        console.log("Error creating task: ", error);
        return null;
    }
}

// Update task and return it
export const updateTask = async (id: string, updatedTask: ITaskInput) => {
    const URL = 'http://localhost:8080/tasks/' + `${id}`;
    try {
        const response = await axios.put(URL, updatedTask);
        return response.data;
    } catch (error) {
        console.log("Error updating task: ", error);
        return null;
    }
}

// Move tasks
export const moveTasks = async (input: IMoveTasksInput) => {
    const URL = 'http://localhost:8080/tasks/move';
    try {
        const response = await axios.post(URL, {planId: input.planId, week: input.week});
        return response.data;
    } catch (error) {
        console.log("Error moving tasks: ", error);
        return null;
    }
};
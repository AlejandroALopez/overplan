import axios from "axios";
import { IPlanInput } from "../types/planTypes";

// GET plan by id
export const fetchPlanData = async (id: string) => {
    const URL = 'http://localhost:8080/plans/' + `${id}`
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
};

// Get all plans by userId
export const fetchPlansByUserId = async (userId: string) => {
    const URL = 'http://localhost:8080/plans?' + `userId=${userId}`;
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
}

// Update plan and return it
export const updatePlan = async (id: string, updatedPlan: IPlanInput) => {
    const URL = 'http://localhost:8080/plans/' + `${id}`;
    try {
        const response = await axios.put(URL, updatedPlan);
        return response.data;
    } catch (error) {
        console.log("Error updating plan: ", error);
        return null;
    }
}
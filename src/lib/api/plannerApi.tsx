import axios from "axios";
import { IPlanInput, Plan } from "../types/planTypes";

// Create Plan. Returns Plan object
export const createPlan = async (input: IPlanInput): Promise<Plan | null> => {
    const token = localStorage.getItem('token');
    const URL = 'http://localhost:8080/plans';

    try {
        const response = await axios.post(URL, input, { headers: {
            Authorization: `Bearer ${token}`
        }});
        return response.data;
    } catch (error) {
        console.log("Error creating plan: ", error);
        return null;
    }
};

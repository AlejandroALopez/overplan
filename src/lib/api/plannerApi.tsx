import axios from "axios";
import { redirect } from 'next/navigation';
import { IPlanInput, Plan } from "../types/planTypes";
import { refreshAccessToken } from "./authApi";

// Create Plan. Returns Plan object
export const createPlan = async (input: IPlanInput): Promise<Plan | null> => {
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    const URL = 'http://localhost:8080/plans';

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.post(URL, input, { headers: {
            Authorization: `Bearer ${token}`
        }});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                // Token might be expired, try to refresh it
                try {
                    token = await refreshAccessToken(refreshToken);
                    localStorage.setItem('token', token || "");

                    // Retry the request with the new token
                    const retryResponse = await axios.post(URL, input, { headers: {
                        Authorization: `Bearer ${token}`
                    }});
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and update plan:', refreshError);
                    redirect(`/auth/login`);
                    return null;
                }
            } else {
                console.error('Error updating plan:', error);
                return null;
            }
        } else {
            // Non-Axios error handling
            console.error('Unexpected error updating plan:', error);
            return null;
        }
    }
};

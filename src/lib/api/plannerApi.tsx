import axios from "axios";
import { NextResponse } from 'next/server';
import { IPlanInput, Plan } from "../types/planTypes";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// Create Plan. Returns Plan object
export const createPlan = async (input: IPlanInput): Promise<Plan | null> => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/plans`;

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
                    token = await refreshAccessToken(refreshToken) || "";

                    // Retry the request with the new token
                    const retryResponse = await axios.post(URL, input, { headers: {
                        Authorization: `Bearer ${token}`
                    }});
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and create plan:', refreshError);
                    // NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/login`);
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

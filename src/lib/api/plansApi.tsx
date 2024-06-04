import axios from "axios";
import { IPlanInput } from "../types/planTypes";
import { refreshAccessToken } from "./authApi";

// GET plan by id
export const fetchPlanData = async (id: string) => {
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    const URL = 'http://localhost:8080/plans/' + `${id}`;

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    let response = await fetch(URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        // Token might be expired, try to refresh it
        try {
            token = await refreshAccessToken(refreshToken);
            localStorage.setItem('token', token || "");

            response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Failed to refresh token', error);
            // Handle the case where refresh token is also invalid/expired
            // For example, redirect to login page
            return;
        }
    }

    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
};

// Get all plans by userId
export const fetchPlansByUserId = async (userId: string) => {
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    const URL = 'http://localhost:8080/plans?' + `userId=${userId}`;

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    let response = await fetch(URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        // Token might be expired, try to refresh it
        try {
            token = await refreshAccessToken(refreshToken);
            localStorage.setItem('token', token || "");

            response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Failed to refresh token', error);
            // Handle the case where refresh token is also invalid/expired
            // For example, redirect to login page
            return;
        }
    }

    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
}

// Update plan and return it
export const updatePlan = async (id: string, updatedPlan: IPlanInput) => {
    let token = localStorage.getItem('token');
    let refreshToken = localStorage.getItem('refresh_token');
    const URL = 'http://localhost:8080/plans/' + `${id}`;

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.put(URL, updatedPlan, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                // Token might be expired, try to refresh it
                try {
                    token = await refreshAccessToken(refreshToken);
                    localStorage.setItem('token', token || "");

                    // Retry the request with the new token
                    const retryResponse = await axios.put(URL, updatedPlan, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and update plan:', refreshError);
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
}

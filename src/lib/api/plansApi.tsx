import axios from "axios";
import { NextResponse } from 'next/server';
import { IPlanInput } from "../types/planTypes";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// GET plan by id
export const fetchPlanData = async (id: string) => {
    let { token, refreshToken } = getTokensFromCookies();
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
            token = await refreshAccessToken(refreshToken) || "";

            response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Failed to refresh token', error);
            return NextResponse.redirect('http://localhost:8080/auth/login');
        }
    }

    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
};

// Get all plans by userId
export const fetchPlansByUserId = async (userId: string) => {
    let { token, refreshToken } = getTokensFromCookies();
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
            token = await refreshAccessToken(refreshToken) || "";

            response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Failed to refresh token', error);
            return NextResponse.redirect('http://localhost:8080/auth/login');
        }
    }

    if (!response.ok) {
        throw new Error('Failed to fetch plan data');
    }
    return response.json();
}

// Update plan and return it
export const updatePlan = async (id: string, updatedPlan: IPlanInput) => {
    let { token, refreshToken } = getTokensFromCookies();
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
                    token = await refreshAccessToken(refreshToken) || "";

                    // Retry the request with the new token
                    const retryResponse = await axios.put(URL, updatedPlan, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and update plan:', refreshError);
                    return NextResponse.redirect('http://localhost:8080/auth/login');
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

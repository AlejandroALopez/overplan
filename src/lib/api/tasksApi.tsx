'use client';

import axios from "axios";
import { NextResponse } from "next/server";
import { IMoveTasksInput, ITaskInput } from "../types/planTypes";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// Get tasks by planId and week
export const fetchTasksByPlanId = async (planId: string, week?: number) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/tasks?' + `planId=${planId}` + `${week ? `&week=${week}` : ''}`;

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
        throw new Error('Failed to fetch tasks data');
    }
    return response.json();
};

// Create task and return it
export const createTask = async (taskBody: ITaskInput) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/tasks';

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.post(URL, taskBody, {
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
                    const retryResponse = await axios.post(URL, taskBody, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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

// Update task and return it
export const updateTask = async (id: string, updatedTask: ITaskInput) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/tasks/' + `${id}`;

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.put(URL, updatedTask, {
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
                    const retryResponse = await axios.put(URL, updatedTask, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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

// Move incomplete tasks to the next week
export const moveTasks = async (input: IMoveTasksInput) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/tasks/move';

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.post(URL, { planId: input.planId, week: input.week }, {
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
                    const retryResponse = await axios.post(URL, { planId: input.planId, week: input.week }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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
};
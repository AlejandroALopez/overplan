'use client';

import axios from "axios";
import { NextResponse } from "next/server";
import { User } from "../types/sessionTypes";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// Update user and return it
export const updateUser = async (id: string, updatedUser: Partial<User>) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/users/' + `${id}`;

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.put(URL, updatedUser, {
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
                    const retryResponse = await axios.put(URL, updatedUser, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and update user:', refreshError);
                    return NextResponse.redirect('http://localhost:8080/auth/login');
                }
            } else {
                console.error('Error updating user:', error);
                return null;
            }
        } else {
            // Non-Axios error handling
            console.error('Unexpected error updating user:', error);
            return null;
        }
    }
}
'use client';

import axios from "axios";
import { NextResponse } from "next/server";
import { User } from "../types/sessionTypes";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// GET user by Id
export const fetchUserById = async (id: string) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/` + `${id}`;

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
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/login`);
        }
    }

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
};

// Update user and return it
export const updateUser = async (id: string, updatedUser: Partial<User>) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/` + `${id}`;

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
                    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/login`);
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
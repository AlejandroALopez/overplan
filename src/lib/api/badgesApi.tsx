import axios from "axios";
import { IBadgeInput } from "../types/planTypes";
import { NextResponse } from 'next/server';
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// Create badge and return it
export const createBadge = async (badgeBody: IBadgeInput) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/badges';

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.post(URL, badgeBody, {
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
                    const retryResponse = await axios.post(URL, badgeBody, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and creating badge:', refreshError);
                    return NextResponse.redirect('http://localhost:8080/auth/login');
                }
            } else {
                console.error('Error creating badge:', error);
                return null;
            }
        } else {
            // Non-Axios error handling
            console.error('Unexpected error creating badge:', error);
            return null;
        }
    }
}

// Get all badges by userId
export const fetchBadgesByUserId = async (userId: string) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/badges?' + `userId=${userId}`;

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
        throw new Error('Failed to fetch badges');
    }
    return response.json();
}

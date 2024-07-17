'use client';

import axios from "axios";
import { NextResponse } from "next/server";
import { getTokensFromCookies, refreshAccessToken } from "../utils/auth";

// Cancel subscription by sub id
export const cancelSubscription = async (subscriptionId: string) => {
    let { token, refreshToken } = getTokensFromCookies();
    const URL = 'http://localhost:8080/subscriptions/cancel-subscription';

    if (!token || !refreshToken) {
        throw new Error('No tokens available');
    }

    try {
        const response = await axios.post(URL, { subscriptionId }, {
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
                    const retryResponse = await axios.post(URL, { subscriptionId }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    console.error('Failed to refresh token and cancel subscription:', refreshError);
                    return null;
                }
            } else {
                console.error('Error canceling subsbcription:', error);
                return null;
            }
        } else {
            // Non-Axios error handling
            console.error('Unexpected error canceling subsbcription:', error);
            return null;
        }
    }
}
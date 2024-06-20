import axios from "axios";
import { IRegisterInput, IRegisterOutput } from "../types/authTypes";
import { setTokensInCookies } from "../utils/auth";

// Returns true if
export const registerUser = async (input: IRegisterInput): Promise<IRegisterOutput> => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', input);
        const { access_token, refresh_token } = response.data;
        setTokensInCookies(access_token, refresh_token);

        return {
            success: true,
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
        };

    } catch (error) {
        console.error('Registration failed', error);
        
        return {
            success: false,
            message: `${error}`,
            token: null,
            refresh_token: null,
        };
    }
}

export async function refreshAccessToken(refreshToken: string) {
    const response = await fetch('http://localhost:8080/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      throw new Error('Failed to refresh access token');
    }
  }
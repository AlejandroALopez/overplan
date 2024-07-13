import axios, { AxiosError } from "axios";
import { IRegisterInput, ILoginInput } from "../types/authTypes";

export const registerUser = async (input: IRegisterInput): Promise<void> => {
  try {
    const response = await axios.post('http://localhost:8080/auth/register', input);

    if (response && response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl;
    }

  } catch (error) {
    console.error('Registration failed', error);
  }
}

export const loginUser = async (input: ILoginInput): Promise<string | null> => {
  try {
    const response = await axios.post('http://localhost:8080/auth/login', input);

    if (response && response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl;
    }
    
    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      }
      console.error('Login failed', error);
      return null
    } else {
      console.error('Unexpected login error: ', error);
      return null;
    }
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
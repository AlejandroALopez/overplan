import axios from "axios";
import { IRegisterInput, ILoginInput } from "../types/authTypes";

export const registerUser = async (input: IRegisterInput): Promise<string | null> => {
  try {
    const response = await axios.post('http://localhost:8080/auth/register', input);

    if (response && response.data.redirectUrl) {
      window.location.href = response.data.redirectUrl;
    }

    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      }
      console.error('Register failed', error);
      return null
    } else {
      console.error('Unexpected register error: ', error);
      return null;
    }
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

export async function sendResetPasswordLink(email: string): Promise<string> {
  let message: string = "";
  try {
    const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });
    message = "Password reset link sent to your email";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        message = error.response.data.message;
      }
      console.error('Error sending password reset link: ', error);
    } else {
      console.error("Error sending password reset link");
      message = "Error sending password reset link";
    }
  } finally {
    return message;
  }
}

export async function resetPassword(token: string, pass: string): Promise<string> {
  let message: string = "";

  try {
    const response = await axios.post('http://localhost:8080/auth/reset-password', { token, pass });
    message = "Password reset successful";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.message) {
        message = error.response.data.message;
      }
      console.error('Error resetting password', error);
    } else {
      console.error("Error resetting password");
      message = "Error resetting password";
    }
  } finally {
    return message;
  }
}
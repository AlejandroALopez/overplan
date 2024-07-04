import axios from 'axios';
import Cookies from 'js-cookie';

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

// Function to refresh the access token using the refresh token
export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await axios.post('http://localhost:8080/auth/refresh-token', {
      refresh_token: refreshToken,
    });

    if (response.status === 201) {
      const { access_token } = response.data;
      Cookies.set('token', access_token, { expires: 1 }); // 1 day expiration
      Cookies.set('refresh_token', refreshToken, { expires: 7 }); // 7 days expiration
      return access_token;
    }
  } catch (error) {
    console.error('Failed to refresh access token:', error);
  }
  return null;
};

// Function to get tokens from cookies
export const getTokensFromCookies = () => {
  const token = Cookies.get('token');
  const refreshToken = Cookies.get('refresh_token');
  return { token, refreshToken };
};

// Function to set tokens in cookies
export const setTokensInCookies = (token: string, refreshToken: string) => {
  Cookies.set('token', token, { expires: 1 }); // 1 day expiration
  Cookies.set('refresh_token', refreshToken, { expires: 7 }); // 7 days expiration
};

// Function to remove tokens in cookies
export const removeTokensInCookies = () => {
  Cookies.remove('token');
  Cookies.remove('refresh_token');
}
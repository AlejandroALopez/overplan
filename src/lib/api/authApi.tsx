import axios from "axios";
import { IRegisterInput, IRegisterOutput } from "../types/authTypes";

// Returns true if
export const registerUser = async (input: IRegisterInput): Promise<IRegisterOutput> => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', input);
        localStorage.setItem('token', response.data.access_token);

        return {
            success: true,
            token: response.data.access_token
        };

    } catch (error) {
        console.error('Registration failed', error);
        
        return {
            success: false,
            message: `${error}`,
            token: null,
        };
    }
}
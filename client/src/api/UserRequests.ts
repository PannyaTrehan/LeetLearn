import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- Types --------------------------------------------------------------------------------------
interface User{
    email: string,
    password: string
}

interface UserEmailResponse{
    email: string,
    password: string,
    profile_pic: string,
    max_questions: number,
    join_date: string,
    streak: number,
    createdAt: string,
    updatedAt: string
}

interface UserResponse{
    user_id: string,
    email: string,
    profile_pic: string,
    max_questions: number
}

interface LoginResponse{
    message: string,
    token: string
}

// --- UserRequests -------------------------------------------------------------------------------
/**
 * Fetches user details based on email.
 * @param email - The email address of the user.
 * @returns A promise that resolves to the user details.
 * @throws Error if the email is invalid or the request fails.
 */
async function getUserDetails(email: string): Promise<UserEmailResponse> {
    if (!email) {
        throw new Error('Email paramater is required');
    }

    try {
        const config = getAuthHeaders();
        const { data } = await axios.get<UserEmailResponse>(`${API_HOST}/api/users/email/${email}`, config);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

async function createUser(user: User): Promise<UserResponse> {
    try {
        if (!user || typeof user !== 'object') {
            throw new Error("Invalid user data");
        }

        // Validate email
        if (!isValidEmail(user.email)) {
            throw new Error("Invalid email format");
        }

        // Validate password
        if (!isValidPassword(user.password)) {
            throw new Error("Invalid password.");
        }

        const response = await axios.post<UserResponse>(`${API_HOST}/api/users`, user);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Server Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("Network Error:", error.request);
        } else {
            console.error("Error:", error.message);
        }

        throw error;
    }
}

async function loginUser(user: User): Promise<LoginResponse> {
    const email: string = user.email;
    const password: string = user.password;

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Validate email
    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }

    // Validate password
    if (!isValidPassword(password)) {
        throw new Error("Invalid password.");
    }

    try {
        const { data } = await axios.post<LoginResponse>(`${API_HOST}/api/users/login`, user);
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('user', email);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// --- Helper functions ----------------------------------------------------------------------------
const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const isValidPassword = (password: string) => {
    const hasMinimumLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    
    return typeof password === 'string' && hasMinimumLength && hasNumber && hasSpecialCharacter && hasNoSpaces;
};

const isValidMaxQuestions = (maxQuestions: number) => {
    return Number.isInteger(maxQuestions) && maxQuestions > 0;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        throw new Error('No token found');
    }

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export {
    getUserDetails, createUser, loginUser,
    isValidEmail, isValidPassword, isValidMaxQuestions
}
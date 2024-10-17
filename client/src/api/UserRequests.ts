import axios from "axios";
import { jwtDecode } from "jwt-decode";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
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
    token: string, //JWT (access) token
    refreshToken: string //refresh token
}

interface RefreshResponse{
    accessToken: string
}

interface User{
    email: string,
    password: string
}

interface StreakResponse{
    streak: number
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

/**
 * Refreshes the access token using the refresh token.
 * @returns A promise that resolves to a new access token and refresh token.
 * @throws Error if the refresh request fails.
 */
async function getUserStreak(): Promise<StreakResponse> {
    try {
        const config = getAuthHeaders();
        const { data } = await axios.get<StreakResponse>(`${API_HOST}/api/users/streak`, config);

        return data;

    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}

/**
 * Creates a User.
 * @param User - The user object.
 * @returns UserResponse - user data.
 * @throws Error if the User is invalid or the request fails.
 */
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

/**
 * Logs in a user.
 * @param User (email, password) - The user object. 
 * @returns UserResponse - user data.
 * @throws Error if the User is invalid or the request fails.
 */
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

        const accessToken = data.token;

        const decodedToken: any = jwtDecode(accessToken); // You can use jwt-decode library
        const expiryTime = decodedToken.exp * 1000; // convert expiry time to milliseconds

        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('tokenExpiry', expiryTime.toString());

        scheduleTokenRefresh();

        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

/**
 * Refreshes the access token using the refresh token.
 * @returns A promise that resolves to a new access token and refresh token.
 * @throws Error if the refresh request fails.
 */
async function refreshToken(): Promise<RefreshResponse> {
    try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) {
            throw new Error('No refresh token found');
        }

        // Send a POST request to refresh the token using the refresh token
        const { data } = await axios.post<RefreshResponse>(`${API_HOST}/api/users/refresh-token`, {
            token: storedRefreshToken // Send only the refresh token
        });

        // Update the localStorage with the new tokens
        localStorage.setItem('accessToken', data.accessToken);

        return data;
    } catch (error) {
        console.error('Error refreshing token:', error);
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
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No token found');
    }

    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

function scheduleTokenRefresh() {
    const expiryTime = parseInt(localStorage.getItem('tokenExpiry') || '0');
    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;

    // Refresh token a bit before the actual expiration time (e.g., 1 minute before)
    const refreshBuffer = 60 * 1000; // 1 minute buffer
    const refreshTime = timeUntilExpiry - refreshBuffer;

    if (refreshTime > 0) {
        setTimeout(async () => {
            try {
                await refreshToken();
                scheduleTokenRefresh(); // Reschedule after refreshing
            } catch (error) {
                console.error('Error refreshing token:', error);
                // Optionally handle cases where refresh fails (e.g., logout user)
            }
        }, refreshTime);
    }
}

export {
    getUserDetails, createUser, loginUser,
    isValidEmail, isValidPassword, isValidMaxQuestions,
    refreshToken, scheduleTokenRefresh, getUserStreak
}
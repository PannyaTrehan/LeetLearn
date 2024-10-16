import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
// API_HOST: The base URL of all API (backend) requests
const API_HOST = "http://localhost:4000";

// --- Types --------------------------------------------------------------------------------------
interface Tag {
    tag_name: string;
}

interface DailyQuestion {
    title: string;
    difficulty: string;
    question_tag: Tag[];
}

interface DailyQuestionsResponse {
    next_review: string;
    question: DailyQuestion;
}

interface UserQuestion{
    title: string,
    next_review: string,
    state: string
}

interface UserQuestionResponse{
    message: string
}

// --- UserQuestionRequests -------------------------------------------------------------------------------
async function getUserQuestions(): Promise<DailyQuestionsResponse[]> {
    try {
        // Get the current date in YYYY-MM-DD format
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month
        const day = String(currentDate.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;

        const config = getAuthHeaders();

        const { data } = await axios.get<DailyQuestionsResponse[]>(`${API_HOST}/api/user_questions/due/${date}`, config);
        console.log(data);
        return data;
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

// --- UserQuestionRequests -------------------------------------------------------------------------------
async function getAllUserQuestions(): Promise<DailyQuestionsResponse[]> {
    try {

        const config = getAuthHeaders();

        const { data } = await axios.get<DailyQuestionsResponse[]>(`${API_HOST}/api/user_questions/select`, config);
        console.log(data);
        return data;
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

// Function to get the user's due questions for the current day
// Makes a GET request to the server using the current date in YYYY-MM-DD format
async function createUserQuestion(question: UserQuestion): Promise<UserQuestionResponse> {
    try {
        // Validate that the question is a valid object
        if (!question || typeof question !== 'object') {
            throw new Error("Invalid question data");
        }

        // Validate that the title
        if (question.title.length <= 0) {
            throw new Error("Invalid title");
        }

        const config = getAuthHeaders();
        console.log(config);

        const response = await axios.post<UserQuestionResponse>(`${API_HOST}/api/user_questions`, question, config);
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

// --- Helper functions ----------------------------------------------------------------------------
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

export {
    createUserQuestion, getUserQuestions, getAllUserQuestions
}
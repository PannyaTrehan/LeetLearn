import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- Types --------------------------------------------------------------------------------------
interface Question{
    title: string,
    difficulty: string
}

interface QuestionResponse{
    question_id: number,
    title: string,
    difficulty: string
}

interface UserQuestion{
    title: string,
    next_review: string
}

interface UserQuestionResponse{
    message: string
}

// --- UserRequests -------------------------------------------------------------------------------
async function createQuestion(question: Question): Promise<QuestionResponse> {
    try {
        if (!question || typeof question !== 'object') {
            throw new Error("Invalid question data");
        }

        //validate title
        if (question.title.length <= 0) {
            throw new Error("Invalid title");
        }

        //validate difficulty
        if (question.difficulty != "Easy" && question.difficulty != "Medium" && question.difficulty != "Hard") {
            throw new Error("Difficulty must be easy, medium or hard");
        }

        const response = await axios.post<QuestionResponse>(`${API_HOST}/api/questions`, question);
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

//user_id is calculated through localhost
//title is passed
//next review date (for now just have it as some default value)
async function createUserQuestion(question: UserQuestion): Promise<UserQuestionResponse> {
    try {
        if (!question || typeof question !== 'object') {
            throw new Error("Invalid question data");
        }

        //validate title
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
    createQuestion, createUserQuestion
}
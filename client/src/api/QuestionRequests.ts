import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
// API_HOST: The base URL of all API (backend) requests
const API_HOST = "http://localhost:4000";

// --- Types --------------------------------------------------------------------------------------
interface Question{
    title: string,
    difficulty: string;
}

interface QuestionResponse{
    question_id: number,
    title: string,
    difficulty: string
}

// Takes in a Question object, validates it, and sends a POST request to the API to create the question
async function createQuestion(question: Question): Promise<QuestionResponse> {
    try {
        // Validate that the question is a valid object
        if (!question || typeof question !== 'object') {
            throw new Error("Invalid question data");
        }

        // Validate the title it should not be empty
        if (question.title.length <= 0) {
            throw new Error("Invalid title");
        }

        //Validate difficulty - it should be "Easy", "Medium", or "Hard"
        if (question.difficulty != "Easy" && question.difficulty != "Medium" && question.difficulty != "Hard") {
            throw new Error("Difficulty must be easy, medium or hard");
        }

        // Send POST request to create the question
        const response = await axios.post<QuestionResponse>(`${API_HOST}/api/questions`, question);
        return response.data;
    } catch (error: any) {
        // Handle server, network, and general errors with detailed messages
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

export {
    createQuestion
}
import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- Types --------------------------------------------------------------------------------------
interface Review{
    successful: boolean,
    optimal: number,
    time: number,
    assistance: number,
    question: number
}

interface ReviewResponse{
    review_date: string,
    review_id: number,
    successful: boolean,
    optimal: number,
    time: number,
    assistance: number,
    user_question_id: number
}

// --- ReviewRequests -------------------------------------------------------------------------------
async function createReview(review: Review): Promise<ReviewResponse> {
    try {
        console.log(review);
        
        const config = getAuthHeaders();

        if (!config) {
            throw new Error("Invalid credentials supplied.")
        }


        if (!review || typeof review !== 'object') {
            throw new Error("Invalid review data");
        }

        if (review.optimal < 0 || review.optimal > 5) {
            throw new Error("Invalid review optimatily set. Must be between 0-5")
        }

        if (review.time < 0 || review.time > 4) {
            throw new Error("Invalid review time set. Must be between 0-4")
        }

        if (review.assistance < 0 || review.assistance > 4) {
            throw new Error("Invalid review time set. Must be between 0-4")
        }

        const response = await axios.post<ReviewResponse>(`${API_HOST}/api/reviews`, review, config);
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
    createReview
}
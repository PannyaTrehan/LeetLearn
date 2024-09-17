const db = require("../database");

// Select all reviews from the database
exports.getAllReviews = async (req, res) => {
    const reviews = await db.review.findAll();
  
    res.json(reviews);
};

// Select one user from the database by their UUID (id)
exports.getUserReviews = async (req, res) => {
    try {
        const user_questions = await db.user_question.findAll({
                where: {
                    user_id: req.params.id
                }
        });

        const userQuestionIDs = user_questions.map(uq => uq.user_question_id);

        const reviews = await db.review.findAll({
            where: {
                user_question_id: userQuestionIDs
            }
        });

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching user reviews:", error);
    }
};

// Create a review for a user qustion
exports.createReview = async (req, res) => {
    try {
        //extract required body fields from the request and ensure all are defined
        const { successful, optimal, time, assistance, question } = req.body;
        if (
            successful === undefined || 
            optimal === undefined || 
            time === undefined || 
            assistance === undefined || 
            question === undefined
        ) {
            return res.status(400).json({ error: "All fields (successful, optimal, time, assistance, question) are required." });
        }

        //for the question that the user wants to review get the unique "user_question" which is based off of the user_id and their questions
            //refer to the question and user_question table for more detail
        const user_question = await db.user_question.findOne({
            where: {
                user_id: req.user.user_id,
                question_id: question,
            },
            attributes: ['user_question_id']
        });

        //if the user_question did not exist
        if (!user_question) {
            return res.status(404).json({ error: "User question not found." });
        }
        
        //create the review if everything went well
        const review = await db.review.create({
            successful: successful,
            optimal: optimal,
            time: time,
            assistance: assistance,
            user_question_id: user_question.user_question_id
        });

        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
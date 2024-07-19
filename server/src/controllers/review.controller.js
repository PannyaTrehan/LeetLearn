const { where } = require("sequelize");
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
        const review = await db.review.create({
            review_id: req.body.user_question,
            review_date: req.body.review_date,
            successful: req.body.successful,
            optimal: req.body.optimal,
            time: req.body.time,
            assistance: req.body.assistance,
            user_question_id: req.body.user_question_id
        });

        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
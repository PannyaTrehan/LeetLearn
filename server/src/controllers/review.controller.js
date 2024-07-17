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

        console.log(userQuestionIDs)

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
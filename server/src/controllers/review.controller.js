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
        //need optimal, time and assistance
        //need the user_question id
        //review_id should be auto generated
        //review_date should be auto generated
        //successful

        const user_id = req.user.user_id;
        const question_id = req.params.question;

        const user_question = await db.user_question.findOne({
            where: {
                user_id: user_id,
                question_id: question_id
            },
            attributes: ['user_question_id']
        });
        
        const review = await db.review.create({
            successful: true,
            optimal: 5,
            time: 2,
            assistance: 4,
            user_question_id: user_question.user_question_id
        });

        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
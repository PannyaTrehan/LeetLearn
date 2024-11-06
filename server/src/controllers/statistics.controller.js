const db = require("../database");
const { Sequelize, DataTypes } = require('sequelize');

exports.getReviewsCompleted = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const period = req.params.period; // Accept 'daily' or 'monthly'

        const user_questions = await db.user_question.findAll({
            where: {
                user_id: user_id
            }
        });

        const userQuestionIDs = user_questions.map(uq => uq.user_question_id);

        // Prepare attributes and grouping based on the period
        let attributes, groupBy;

        if (period === 'monthly') {
            attributes = [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('review_date'), '%Y-%m'), 'month'], // Format for month
                [Sequelize.fn('COUNT', Sequelize.col('review_id')), 'count'] // Count reviews
            ];
            groupBy = [Sequelize.fn('DATE_FORMAT', Sequelize.col('review_date'), '%Y-%m')]; // Group by year and month
        } else {
            // Default to daily
            attributes = [
                [Sequelize.fn('DATE', Sequelize.col('review_date')), 'date'], // Extract date
                [Sequelize.fn('COUNT', Sequelize.col('review_id')), 'count'] // Count reviews
            ];
            groupBy = [Sequelize.fn('DATE', Sequelize.col('review_date'))]; // Group by review_date
        }

        // Retrieve the count of reviews based on the specified period
        const userReviewsCount = await db.review.findAll({
            where: {
                user_question_id: userQuestionIDs
            },
            attributes: attributes,
            group: groupBy, // Group by date or month
            order: [[groupBy[0], 'ASC']] // Order by date or month
        });

        // Format the response
        const formattedReviewsCount = userReviewsCount.map(review => ({
            date: review.dataValues.date || review.dataValues.month, // Use date or month based on the grouping
            count: review.dataValues.count
        }));

        res.json({ reviews: formattedReviewsCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getQuestionsCreated = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const userQuestionsCount = await db.user_question.count({
            where: {
                user_id: user_id
            }
        });

        res.json({userQuestionsCount: userQuestionsCount});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCorrectIncorrectReviews = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const user_questions = await db.user_question.findAll({
            where: {
                user_id: user_id
            }
        });

        const userQuestionIDs = user_questions.map(uq => uq.user_question_id);

        // Retrieve the total count of reviews without grouping
        const totalReviewsCount = await db.review.count({
            where: {
                user_question_id: userQuestionIDs
            }
        });

        // Retrieve the count of correct reviews without grouping
        const correctReviewsCount = await db.review.count({
            where: {
                user_question_id: userQuestionIDs,
                successful: 1
            }
        });

        // Calculate incorrect reviews count
        const incorrectReviewsCount = totalReviewsCount - correctReviewsCount;

        // Format the response to show only the counts as direct values
        const formattedReviewsCount = {
            correct: correctReviewsCount,
            incorrect: incorrectReviewsCount,
            total: totalReviewsCount
        };
        
        res.json({ reviews: formattedReviewsCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

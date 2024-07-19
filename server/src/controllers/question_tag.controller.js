const { where } = require("sequelize");
const db = require("../database");

// Create a user question
exports.createQuestionTag = async (req, res) => {
    try {    
        const questionTag = await db.question_tag.create({
            id: req.body.id,
            tag_id: req.body.tag_id,
            question_id: req.body.question_id
        });

        res.json(questionTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
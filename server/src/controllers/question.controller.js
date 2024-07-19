const { where } = require("sequelize");
const db = require("../database");

// Create a user question
exports.createQuestion = async (req, res) => {
    try {
        const title = req.body.title;

        const existingQuestion = await db.question.findOne({
            where: { title: title }
        });

        if (existingQuestion) {
            return res.status(400).json({ error: "Question already exists" });
        }
        
        const question = await db.question.create({
            title: title,
            difficulty: req.body.difficulty
        });

        res.json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
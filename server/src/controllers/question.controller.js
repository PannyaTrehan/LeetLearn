const db = require("../database");

exports.getQuestionByTitle = async (req, res) => {
    try {
        const question = await db.question.findOne({
            where: { title: req.body.title}
        });

        if (!question) {
            return res.status(400).json({ error: "Question does not exist" });
        }

        res.json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
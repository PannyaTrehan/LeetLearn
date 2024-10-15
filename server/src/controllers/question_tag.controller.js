const db = require("../database");
const { getQIDByTitle } = require("../utils/getQIDByTitle")

// Create a user question
exports.createQuestionTag = async (req, res) => {
    try {
        const question_id = await getQIDByTitle(req.body.question_title);
        
        const questionTag = await db.question_tag.create({
            tag_name: req.body.tag_name,
            question_id: question_id
        });

        res.status(201).json({
            message: "Tag for question created successfully",
            data: {
                id: questionTag.id,
                tag_name: questionTag.tag_name,
                question_id: questionTag.question_id
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
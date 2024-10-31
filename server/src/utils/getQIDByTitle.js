const db = require("../database");

exports.getQIDByTitle = async (title) => {
    try {
        const question = await db.question.findOne({
            where: { title: title }
        });

        if (!question) {
            throw new Error("Question does not exist");
        }

        return question.question_id;
    } catch (error) {
        throw error;
    }
};
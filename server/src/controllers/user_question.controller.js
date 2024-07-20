const { where, Op } = require("sequelize");
const db = require("../database");

// Select all user questions from the database
exports.getAllUserQuestions = async (req, res) => {
    try {
        const userQuestions = await db.user_question.findAll();
  
        res.json(userQuestions);
    } catch (error) {
        console.error("Error fetching all user questions", error);
    }

};

// Select a specific user's user_questions from the database by their UUID (id)
exports.getUsersQuestions = async (req, res) => {
    try {
        const userQuestions = await db.user_question.findAll({
                where: {
                    user_id: req.params.id
                }
        });

        res.json(userQuestions);
    } catch (error) {
        console.error("Error fetching user's questions:", error);
    }
};

// Select a specific user's user_questions from the database by their UUID (id)
exports.getUsersQuestionsWithTags = async (req, res) => {
    try {
        const userQuestions = await db.user_question.findAll({
            where: { user_id: req.params.id },
            attributes: ['next_review', ],
            include: [
                {
                    model: db.question,
                    as: 'question',
                    attributes: ['title', 'difficulty'],
                    include: [
                        {
                            model: db.tag,
                            as: 'tags',
                            attributes: ['title'],
                            through: { attributes: [] }
                        }
                    ]
                }
            ]
        });

        res.json(userQuestions);
    } catch (error) {
        console.error("Error fetching user's questions:", error);
    }
};

// Create a user question
exports.createUserQuestion = async (req, res) => {
    try {    
        const userQuestion = await db.user_question.create({
            user_question: req.body.user_question,
            next_review: req.body.next_review,
            user_id: req.body.user_id,
            question_id: req.body.question_id
        });

        res.json(userQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a user question
exports.updateUserQuestion = async (req, res) => {
    try {
        const { date } = req.body;
        
        const updateData = {
            next_review: date !== undefined ? date : null,
        };
        
        await db.user_question.update(
            {
                next_review: req.body.date,
            },
            {
                where: { user_question_id: req.params.id}
            }
        );

        res.json({ message: "User question updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user question
exports.deleteUserQuestion = async (req, res) => {
    try {
        const user_question_id = req.params.id;
        const userQuestion = await db.user_question.findByPk(user_question_id);

        if (userQuestion) {
            await userQuestion.destroy();
            res.status(200).json({ message: 'user_question deleted successfully.' });
        } else {
            res.status(404).json({ error: `user_question with id ${user_question_id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.dueUserQuestionsWithTags = async (req, res) => {
    try {
        const { date, id } = req.body;

        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const userQuestions = await db.user_question.findAll({
            where: {
                user_id: id,
                next_review: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            },
            attributes: ['next_review', ],
            include: [
                {
                    model: db.question,
                    as: 'question',
                    attributes: ['title', 'difficulty'],
                    include: [
                        {
                            model: db.tag,
                            as: 'tags',
                            attributes: ['title'],
                            through: { attributes: [] }
                        }
                    ]
                }
            ]
        });

        res.json(userQuestions);
    } catch (error) {
        console.error("Error fetching user's questions:", error);
    }
};
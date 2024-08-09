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
        const user_id = req.user.user_id;

        const userQuestions = await db.user_question.findAll({
            where: { user_id: user_id },
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

        if (userQuestions) {
            res.json(userQuestions);
        } else {
            res.status(404).json({ error: 'User questions not found' });
        }
    } catch (error) {
        console.error("Error fetching user's questions:", error);
    }
};

// Create a user question
//needs {title (question title), user_id (from authentication) and next review date}
exports.createUserQuestion = async (req, res) => {
    try {
        console.log(req.user)

        const question = await db.question.findOne({
            where: { title: req.body.title}
        });

        if (!question) {
            return res.status(400).json({ error: "Question does not exist" });
        }

        const userQuestion = await db.user_question.create({
            next_review: req.body.next_review, //this will needed to be calculated via the algorithm that will be implemented
            user_id: req.user.user_id, //get the user ID from the JWT token
            // user_id: req.body.user_id, //get the user ID from the JWT token
            question_id: question.question_id //how do I get this?
        });
        
        res.status(201).json({ message: "User question has been added successfully" });
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
        const id = req.user.user_id;
        const date = req.params.date;

        const startDate = new Date(date);
        if (isNaN(startDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
        }
        
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
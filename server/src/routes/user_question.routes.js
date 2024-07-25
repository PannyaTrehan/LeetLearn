module.exports = (express, app) => {
    const controller = require("../controllers/user_question.controller.js");
    const router = express.Router();
    const authenticateToken = require('../middleware/authenticateToken.js');
  
    // Select all reviews from the database
    router.get("/", authenticateToken, controller.getAllUserQuestions);

    // Select all questions for a given user id
    router.get("/select", authenticateToken, controller.getUsersQuestionsWithTags);

    // Select questions for a given user id and date
    router.get("/due/:date", authenticateToken, controller.dueUserQuestionsWithTags);

    // Set user_question
    router.put("/select/:id", authenticateToken, controller.updateUserQuestion);

    // Create a user question
    router.post("/", authenticateToken, controller.createUserQuestion);

    // Delete a user question
    router.delete("/select/:id", authenticateToken, controller.deleteUserQuestion);

    // Add routes to server.
    app.use("/api/user_questions", router);
  };
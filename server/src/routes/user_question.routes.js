module.exports = (express, app) => {
    const controller = require("../controllers/user_question.controller.js");
    const router = express.Router();
  
    // Select all reviews from the database
    router.get("/", controller.getAllUserQuestions);

    // // Select all reviews for a given user id
    // router.get("/select/:id", controller.getUsersQuestions);

    // Select all questions for a given user id
    router.get("/select/:id", controller.getUsersQuestionsWithTags);

    // Select questions for a given user id and date
    router.get("/due", controller.dueUserQuestionsWithTags);

    // Set user_question
    router.put("/select/:id", controller.updateUserQuestion);

    // Create a user question
    router.post("/", controller.createUserQuestion);

    // Delete a user question
    router.delete("/select/:id", controller.deleteUserQuestion);

    // Add routes to server.
    app.use("/api/user_questions", router);
  };
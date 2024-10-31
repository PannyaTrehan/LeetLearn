module.exports = (express, app) => {
    const controller = require("../controllers/question.controller.js");
    const router = express.Router();

    // Get a question object by its title
    router.get("/", controller.getQuestionByTitle);

    // Create a review
    router.post("/", controller.createQuestion);

    // Add routes to server.
    app.use("/api/questions", router);
  };
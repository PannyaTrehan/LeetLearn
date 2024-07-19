module.exports = (express, app) => {
    const controller = require("../controllers/question_tag.controller.js");
    const router = express.Router();

    // Create a review
    router.post("/", controller.createQuestionTag);

    // Add routes to server.
    app.use("/api/question_tags", router);
  };
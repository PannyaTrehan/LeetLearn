module.exports = (express, app) => {
    const controller = require("../controllers/statistics.controller.js");
    const router = express.Router();
    const authenticateToken = require('../middleware/authenticateToken.js');
  
    router.get("/questions-due", authenticateToken, controller.getQuestionsDue);

    router.get("/reviews-completed/:period", authenticateToken, controller.getReviewsCompleted);

    router.get("/questions-created", authenticateToken, controller.getQuestionsCreated);

    router.get("/correct-incorrect-reviews/:period", authenticateToken, controller.getCorrectIncorrectReviews);

    // Add routes to server.
    app.use("/api/stats", router);
  };
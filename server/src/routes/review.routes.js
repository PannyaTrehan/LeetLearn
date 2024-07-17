module.exports = (express, app) => {
    const controller = require("../controllers/review.controller.js");
    const router = express.Router();
  
    // Select all reviews from the database
    router.get("/", controller.getAllReviews);

    // Select all reviews for a given user id
    router.get("/select/:id", controller.getUserReviews);

    // Add routes to server.
    app.use("/api/reviews", router);
  };
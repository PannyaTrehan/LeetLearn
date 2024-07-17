module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    // Select all users from the database
    router.get("/", controller.getAllUsers);

    // Select a single user with a user id
    router.get("/select/:id", controller.getUserByID);

    // Create a user
    router.post("/", controller.createUser);

    // Login a user
    router.post("/login", controller.loginUser);
  
    // Add routes to server.
    app.use("/api/users", router);
  };
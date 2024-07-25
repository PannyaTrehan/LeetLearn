module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
    const authenticateToken = require('../middleware/authenticateToken.js');

    // Public routes
    router.post("/", controller.createUser);
    router.post("/login", controller.loginUser);

    //Protected routes
    router.get("/", authenticateToken, controller.getAllUsers);
    router.get("/select", authenticateToken, controller.getUserByID);
    
    app.use("/api/users", router);
  };
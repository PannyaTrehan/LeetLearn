module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();
  
    // select all users
    router.get("/", controller.all);

    // Select a single user with username
    router.get("/select/:username", controller.one);
  
    // Add routes to server.
    app.use("/api/users", router);
  };
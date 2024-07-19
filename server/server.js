const express = require("express");
const cors = require("cors");
const db = require("./src/database/index.js");
require('dotenv').config();

// Sync the database
db.sync();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Restful API for the SOIL website!" });
});

// Add routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/review.routes.js")(express, app);
require("./src/routes/user_question.routes.js")(express, app);
require("./src/routes/question.routes.js")(express, app);
require("./src/routes/question_tag.routes.js")(express, app);

// Set port, listen for requests
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

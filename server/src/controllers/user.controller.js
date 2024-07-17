const { where } = require("sequelize");
const db = require("../database");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken"); // For generating JWT tokens

// Select all users from the database
exports.getAllUsers = async (req, res) => {
    const users = await db.user.findAll();
  
    res.json(users);
};

// Select one user from the database by their UUID (id)
exports.getUserByID = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);
  
    res.json(user);
};

// Create a user
exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password, { type: argon2.argon2id });
    
        const user = await db.user.create({
            email: req.body.email,
            password: hashedPassword,
            profile_pic: req.body.profile_pic,
            max_questions: req.body.max_questions
        });

        res.json(user);
        // res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        if (!email || !password) {
            console.log("unhashedPassword: ", password);
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await db.user.findOne({ where: { email } });

        //if the user does not exist in the database
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        //provided user exists (checked above) validate the password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
        });

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
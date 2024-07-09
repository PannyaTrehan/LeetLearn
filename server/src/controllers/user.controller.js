const { where } = require("sequelize");
const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
    const users = await db.user.findAll();
  
    res.json(users);
};

//select one user from the database
exports.one = async (req, res) => {
    const user = await db.user.findByPk(req.params.email);
  
    res.json(user);
};
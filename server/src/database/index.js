const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);


db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  await seedData();
};

async function seedData() {
  const countUsers = await db.user.count();

  if (countUsers > 0) {
    return;
  }

  const argon2 = require("argon2");

  let hash = await argon2.hash("Happy123$", { type: argon2.argon2id });

  await db.user.create({ email: "mbolger@gmail.com", password: hash});
}

module.exports = db;
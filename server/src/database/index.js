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
db.question = require("./models/question.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.tag = require("./models/tag.js")(db.sequelize, DataTypes);
db.user_question = require("./models/user_question.js")(db.sequelize, DataTypes);
db.question_tag = require("./models/question_tag.js")(db.sequelize, DataTypes);

// Define associations.
db.user.hasMany(db.review, { as: "review", foreignKey: "user_id"});
db.review.hasMany(db.user, { foreignKey: "user_id"});

db.user.belongsToMany(db.question, {through: db.user_question, foreignKey: "user_id", otherKey: 'question_id'});
db.question.belongsToMany(db.user, { through: db.user_question, foreignKey: 'question_id', otherKey: 'user_id' });

db.tag.belongsToMany(db.question, {through: db.question_tag, foreignKey: "tag_id", otherKey: 'question_id'});
db.question.belongsToMany(db.tag, { through: db.question_tag, foreignKey: 'question_id', otherKey: 'tag_id' });

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

  // const argon2 = require("argon2");

  // let hash = await argon2.hash("Happy123$", { type: argon2.argon2id });

  // await db.user.create({ email: "mbolger@gmail.com", password: hash});
}

module.exports = db;
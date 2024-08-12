const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: console.log
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.question = require("./models/question.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.tag = require("./models/tag.js")(db.sequelize, DataTypes);
db.user_question = require("./models/user_question.js")(db.sequelize, DataTypes);
db.question_tag = require("./models/question_tag.js")(db.sequelize, DataTypes);

// Define associations.
db.user.belongsToMany(db.question, {through: db.user_question, foreignKey: "user_id", otherKey: 'question_id'});
db.question.belongsToMany(db.user, { through: db.user_question, foreignKey: 'question_id', otherKey: 'user_id' });

db.tag.belongsToMany(db.question, {through: db.question_tag, foreignKey: "tag_id", otherKey: 'question_id'});
db.question.belongsToMany(db.tag, { through: db.question_tag, foreignKey: 'question_id', otherKey: 'tag_id' });

//1-many relationship between the user_question (user's question that's saved) and a review (user's reviews for a question) 
db.user_question.hasMany(db.review, { as: "review", foreignKey: "user_question_id"});
db.review.belongsTo(db.user_question, { as: "user_question", foreignKey: "user_question_id"});

//one question can "have" many user_questions, but one user_question can only belong to one question
db.question.hasMany(db.user_question, { as: "user_question", foreignKey: "question_id"});
db.user_question.belongsTo(db.question, { as: "question", foreignKey: "question_id"});

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

  await initialData();
}

async function initialData() {
  try {
    const argon2 = require("argon2");

    let hash1 = await argon2.hash("James123456!", { type: argon2.argon2id });
    let hash2 = await argon2.hash("Phil123456!", { type: argon2.argon2id });
    
    const users = [
      { email: "james@email.com", password: hash1, profile_pic: "james.jpg", max_questions: 10},
      { email: "phil@email.com", password: hash2, profile_pic: "phil.jpg", max_questions: 15}
    ]

    const createdUsers = await db.user.bulkCreate(users, { returning: true });

    const tags = [
      { title: "New" },
      { title: "Learning" },
      { title: "Relearning" },
      { title: "Young" },
      { title: "Mature" }
    ]

    const createdTags = await db.tag.bulkCreate(tags, { returning: true });

    const questions = [
      { title: "1. Two Sum", difficulty: "Easy" },
      { title: "9. Palindrome Number", difficulty: "Easy" },
      { title: "6. Zigzag Conversion", difficulty: "Medium" },
      { title: "4. Median of Two Sorted Arrays", difficulty: "Hard" },
      { title: "31. Next Permutation", difficulty: "Medium" },
    ]

    const createdQuestions = await db.question.bulkCreate(questions, { returning: true });


    const question_tags = [
      { tag_id: 1, question_id: createdQuestions[2].question_id },
      { tag_id: 2, question_id: createdQuestions[1].question_id }
    ]

    const createdQuestionTags = await db.question_tag.bulkCreate(question_tags, { returning: true });

    const now = new Date();

    const user_questions = [
      { next_review: now, state: 'Learning', user_id: createdUsers[0].user_id, question_id: createdQuestions[3].question_id },
      { next_review: now, state: 'Mature', user_id: createdUsers[1].user_id, question_id: createdQuestions[2].question_id }
    ]

    const createdUserQuestions = await db.user_question.bulkCreate(user_questions, { returning: true });

    const reviews = [
      { review_date: now, successful: false, optimal: 0, time: 5, assistance: 4, notes: "Not really that good. Couldn't really understand what was happening.", user_question_id: createdUserQuestions[0].user_question_id},
    ]

    const createdReviews = await db.review.bulkCreate(reviews, { returning: true });


  } catch (error) {
    console.log("Error adding initial data:", error);
  }
}

module.exports = db;
module.exports = (sequelize, DataTypes) =>
    sequelize.define("user_question", {
        user_question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        next_review: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
      timestamps: false
    });
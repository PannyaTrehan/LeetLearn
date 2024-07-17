module.exports = (sequelize, DataTypes) =>
    sequelize.define("question", {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(225),
            allowNull: false,
            unique: true
        },
        difficulty: {
            type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
            allowNull: true
        }
    }, {
      timestamps: false
    });
module.exports = (sequelize, DataTypes) =>
    sequelize.define("user_question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        next_review: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
      timestamps: false
    });
module.exports = (sequelize, DataTypes) =>
    sequelize.define("question_tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, {
      timestamps: false
    });
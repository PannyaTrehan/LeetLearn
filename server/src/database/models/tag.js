module.exports = (sequelize, DataTypes) =>
    sequelize.define("tag", {
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(225),
            allowNull: false
        }
    }, {
      timestamps: false
    });
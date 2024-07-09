module.exports = (sequelize, DataTypes) =>
    sequelize.define("user", {
        email: {
            type: DataTypes.STRING(254),
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(225),
            allowNull: false
        }, 
    }, {
      timestamps: false
    });
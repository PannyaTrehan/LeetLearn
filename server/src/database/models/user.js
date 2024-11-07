module.exports = (sequelize, DataTypes) =>
    sequelize.define("user", {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(225),
            allowNull: true
        },
        profile_pic: {
            type: DataTypes.STRING(225),
            allowNull: true
        },
        max_questions: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        streak: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
      timestamps: true //want to know how long the user has been created for
    });
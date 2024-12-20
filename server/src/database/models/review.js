module.exports = (sequelize, DataTypes) =>
    sequelize.define("review", {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        review_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        successful: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        optimal: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            },
            allowNull: false
        },
        time: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 4
            },
            allowNull: false
        },
        assistance: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 4
            },
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "user_questions",
                key: "user_question_id"
            }
        }
    }, {
      timestamps: false
    });
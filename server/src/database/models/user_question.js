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
            allowNull: true,
        },
        maturity: {
            type: DataTypes.ENUM('New', 'Learning', 'Relearning', 'Young', 'Mature'),
            allowNull: false,
            defaultValue: 'New'
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'question_id'
            }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    }, {
      timestamps: false,
      indexes: [
            {
                unique: true,
                fields: ['question_id', 'user_id']
            }
        ]
    });
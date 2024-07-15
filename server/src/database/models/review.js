module.exports = (sequelize, DataTypes) =>
    sequelize.define("review", {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        problem_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review_date: {
            type: DataTypes.DATE,
            allowNull: false
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
                max: 5
            },
            allowNull: false
        },
        assistance: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            },
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
      timestamps: false
    });
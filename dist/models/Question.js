"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Question extends sequelize_1.Model {
    static associate(models) {
        Question.hasMany(models.Option, { foreignKey: 'question_id', as: 'Options' });
    }
}
exports.Question = Question;
Question.init({
    question_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize, modelName: 'Question', tableName: "question",
    timestamps: true,
});

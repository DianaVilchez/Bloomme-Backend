"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Question_1 = require("./Question");
class Option extends sequelize_1.Model {
}
exports.Option = Option;
Option.init({
    option_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    option_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    question_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Question_1.Question,
            key: 'question_id'
        }
    },
    is_correct: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database_1.sequelize, modelName: 'Option', tableName: "option",
    timestamps: true,
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizCategory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class QuizCategory extends sequelize_1.Model {
}
exports.QuizCategory = QuizCategory;
QuizCategory.init({
    quiz_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "QuizCategory",
    tableName: "quiz_category",
    timestamps: true,
});

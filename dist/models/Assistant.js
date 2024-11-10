"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assistant = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Assistant extends sequelize_1.Model {
}
exports.Assistant = Assistant;
Assistant.init({
    assistant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Assistant",
    tableName: "assistant",
    timestamps: true,
});

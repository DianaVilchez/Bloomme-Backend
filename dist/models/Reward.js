"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reward = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Reward extends sequelize_1.Model {
}
exports.Reward = Reward;
Reward.init({
    reward_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    imageHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    required_points: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('background', 'avatar'),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Reward",
    tableName: "reward",
    timestamps: true,
});

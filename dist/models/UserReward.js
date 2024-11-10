"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReward = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
const Reward_1 = require("./Reward");
class UserReward extends sequelize_1.Model {
}
exports.UserReward = UserReward;
UserReward.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User_1.User,
            key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    reward_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Reward_1.Reward,
            key: 'reward_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    reward_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "UserReward",
    tableName: "user_reward",
    timestamps: true,
});

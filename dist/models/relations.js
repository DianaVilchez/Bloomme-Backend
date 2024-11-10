"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module_1 = require("./Module");
const Option_1 = require("./Option");
const Path_1 = require("./Path");
const Question_1 = require("./Question");
const Reward_1 = require("./Reward");
const User_1 = require("./User");
//Reacion de muchos a muchos
User_1.User.belongsToMany(Reward_1.Reward, {
    through: 'user_reward',
    foreignKey: 'user_id',
    otherKey: 'reward_id'
});
Reward_1.Reward.belongsToMany(User_1.User, {
    through: 'user_reward',
    foreignKey: 'reward_id',
    otherKey: 'user_id'
});
//--------------------------
Path_1.Path.hasMany(Module_1.Module, { foreignKey: 'path_id', });
Module_1.Module.belongsTo(Path_1.Path, { foreignKey: 'path_id' });
Question_1.Question.hasMany(Option_1.Option, { foreignKey: 'question_id', as: 'Options' });
Option_1.Option.belongsTo(Question_1.Question, { foreignKey: 'question_id' });

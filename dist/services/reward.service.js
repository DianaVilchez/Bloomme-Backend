"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredPointsServices = exports.getUnlockedRewardsServices = exports.updateDataReward = exports.getRewardbyId = exports.allRewardService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const allRewardService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allReward = yield models_1.Reward.findAll();
    return allReward;
});
exports.allRewardService = allRewardService;
const getRewardbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reward = yield models_1.Reward.findOne({
        where: { reward_id: id }
    });
    if (!reward) {
        throw new Error('the reward does not exist');
    }
    return reward;
});
exports.getRewardbyId = getRewardbyId;
const updateDataReward = (id, newRequiredPoints) => __awaiter(void 0, void 0, void 0, function* () {
    const [updateCount] = yield models_1.Reward.update({ required_points: newRequiredPoints }, { where: { reward_id: id } });
    return updateCount;
});
exports.updateDataReward = updateDataReward;
const getUnlockedRewardsServices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const userPoints = user.total_point;
    const unlockedRewards = yield models_1.Reward.findAll({
        where: {
            required_points: {
                [sequelize_1.Op.lte]: userPoints
            }
        }
    });
    return unlockedRewards;
});
exports.getUnlockedRewardsServices = getUnlockedRewardsServices;
const getRequiredPointsServices = (RewardId) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardPoint = yield models_1.Reward.findOne({
        where: { reward_id: RewardId },
        attributes: ['required_points']
    });
    if (!rewardPoint) {
        throw new Error("Reward not found");
    }
    return rewardPoint.required_points;
    ;
});
exports.getRequiredPointsServices = getRequiredPointsServices;

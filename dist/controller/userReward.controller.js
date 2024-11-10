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
exports.allUserRewards = exports.selectReward = void 0;
const reward_service_1 = require("../services/reward.service");
const userReward_service_1 = require("../services/userReward.service");
const selectReward = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id);
    const rewardId = parseInt(req.params.reward_id);
    const rewardType = req.params.reward_type;
    console.log(userId);
    if (isNaN(userId) || isNaN(rewardId)) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return;
    }
    try {
        const existingReward = yield (0, userReward_service_1.existingRewardServices)(userId, rewardId);
        // Si ya existe la recompensa, retornamos un mensaje de error
        if (existingReward) {
            res.status(400).json({ error: "Reward already registered" });
            return;
        }
        const pointsReward = yield (0, reward_service_1.getRequiredPointsServices)(rewardId);
        console.log(pointsReward);
        if (pointsReward === null) {
            res.status(404).json({ error: "Reward not found or does not have required points" });
            return;
        }
        yield (0, userReward_service_1.insertRewardUserServices)(userId, rewardId, rewardType);
        // await updateTotalpointsServices(userId,pointsReward)
        res.status(200).json({ message: "Reward selected successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.selectReward = selectReward;
const allUserRewards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id);
    const type = req.params.reward_type;
    try {
        const allRewards = yield (0, userReward_service_1.allUserRewardsServices)(userId, type);
        const rewardsIds = [...new Set(allRewards.map((reward) => reward.reward_id))];
        const response = {
            userID: userId,
            rewards_id: rewardsIds,
            reward_type: type
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.allUserRewards = allUserRewards;

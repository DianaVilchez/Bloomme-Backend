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
exports.allUserRewardsServices = exports.insertRewardUserServices = exports.existingRewardServices = void 0;
const models_1 = require("../models");
const existingRewardServices = (userId, rewardId) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardUser_id = rewardId;
    if (rewardUser_id) {
        throw new Error("Reward not found");
    }
    const existingReward = yield models_1.UserReward.findOne({
        where: {
            user_id: userId,
            reward_id: rewardId,
        }
    });
    return existingReward;
});
exports.existingRewardServices = existingRewardServices;
const insertRewardUserServices = (userId, rewardId, rewardType) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const insertReward = yield models_1.UserReward.create({
        user_id: userId,
        reward_id: rewardId,
        reward_type: rewardType,
    });
    return insertReward;
});
exports.insertRewardUserServices = insertRewardUserServices;
const allUserRewardsServices = (userId, type) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const allReward = yield models_1.UserReward.findAll({
        where: {
            user_id: userId,
            reward_type: type,
        }
    });
    return allReward;
});
exports.allUserRewardsServices = allUserRewardsServices;
// export const updateTotalpointsServices = async(userId: number ,requiredPoints : number ):Promise< IUser> => {
//     const user = await User.findByPk(userId);
//     if(!user?.total_point){
//         throw new Error("Not found points");
//     }
//     const newPoints = user?.total_point - requiredPoints
//     if (!user) {
//         throw new Error("User not found");
//     }
//     const updatePoints = await user.update(
//         { total_point: newPoints }
//     )
//     return updatePoints
// }

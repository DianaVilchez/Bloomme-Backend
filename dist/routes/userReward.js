"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRewardRouter = void 0;
const express_1 = __importDefault(require("express"));
const userReward_controller_1 = require("../controller/userReward.controller");
const userRewardRouter = express_1.default.Router();
exports.userRewardRouter = userRewardRouter;
userRewardRouter.get('/user-reward/:user_id/:reward_id/:reward_type', userReward_controller_1.selectReward);
userRewardRouter.get('/user-reward/:user_id/:reward_type', userReward_controller_1.allUserRewards);

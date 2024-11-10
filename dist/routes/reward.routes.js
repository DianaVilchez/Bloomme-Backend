"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardRouter = void 0;
const express_1 = __importDefault(require("express"));
const reward_controller_1 = require("../controller/reward.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const rewardRouter = express_1.default.Router();
exports.rewardRouter = rewardRouter;
rewardRouter.post('/reward', upload.single('image'), reward_controller_1.storeReward);
rewardRouter.get('/allreward', reward_controller_1.getAllReward);
rewardRouter.get('/reward/:id', reward_controller_1.getIdReward);
rewardRouter.put('/reward/:id', reward_controller_1.updateDataRewardById);
rewardRouter.get('/reward/:userId/unlocked', reward_controller_1.getUnlockedRewardsForUser);

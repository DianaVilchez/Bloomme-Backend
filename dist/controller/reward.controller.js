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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnlockedRewardsForUser = exports.updateDataRewardById = exports.getIdReward = exports.getAllReward = exports.storeReward = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const models_1 = require("../models");
const crypto_1 = __importDefault(require("crypto"));
const reward_service_1 = require("../services/reward.service");
const storeReward = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { required_points, type } = req.body;
    const imageFile = req.file;
    if (!imageFile || !required_points || !type) {
        res.status(400).json({ error: "Missing data" });
        return;
    }
    const hash = crypto_1.default.createHash("md5").update(imageFile.buffer).digest("hex");
    try {
        const existingReward = yield models_1.Reward.findOne({ where: { imageHash: hash } });
        if (existingReward) {
            res.status(400).json({ error: "The image is already stored as a reward" });
            return;
        }
        const fileName = `${hash}_image.jpg`;
        const filePath = path_1.default.join(__dirname, "../uploads", fileName);
        yield fs_extra_1.default.ensureDir(path_1.default.join(__dirname, "../uploads"));
        yield fs_extra_1.default.writeFile(filePath, imageFile.buffer);
        const newReward = yield models_1.Reward.create({
            image: filePath,
            imageHash: hash,
            required_points,
            type,
        });
        res.status(200).json(newReward);
    }
    catch (error) {
        console.error("Error saving image:", error);
        res.status(500).json({ error: "Error saving image" });
    }
});
exports.storeReward = storeReward;
const getAllReward = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rewardAll = yield (0, reward_service_1.allRewardService)();
        res.status(200).json(rewardAll);
    }
    catch (error) {
        res.status(500).json({ message: 'An unexpected error has occurred' });
    }
});
exports.getAllReward = getAllReward;
const getIdReward = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardId = parseInt(req.params.id, 10);
    try {
        const reward = yield (0, reward_service_1.getRewardbyId)(rewardId);
        res.status(200).json(reward);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
});
exports.getIdReward = getIdReward;
const updateDataRewardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rewardId = parseInt(req.params.id, 10);
    const { required_points } = req.body;
    if (isNaN(rewardId) || isNaN(required_points)) {
        res.status(400).json({ message: "Invalid data" });
        return;
    }
    try {
        const rewardUpdate = yield (0, reward_service_1.updateDataReward)(rewardId, required_points);
        if (rewardUpdate > 0) {
            res.status(200).json({ message: "Reward added successfully" });
        }
        else {
            res.status(404).json({ message: "Reward not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateDataRewardById = updateDataRewardById;
const getUnlockedRewardsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10);
    console.log(userId);
    try {
        const rewardUnlocked = yield (0, reward_service_1.getUnlockedRewardsServices)(userId);
        console.log(rewardUnlocked);
        if (rewardUnlocked.length > 0) {
            res.status(200).json({ rewards: rewardUnlocked, message: "Rewards found successfully" });
        }
        else {
            res.status(404).json({ message: "No rewards unlocked for this user" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
});
exports.getUnlockedRewardsForUser = getUnlockedRewardsForUser;

import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";
import { Reward } from "../models";
import crypto from "crypto";
import {
  allRewardService,
  getRewardbyId,
  getUnlockedRewardsServices,
  updateDataReward,
} from "../services/reward.service";

export const storeReward = async (req: Request, res: Response) => {
  const { required_points, type } = req.body;
  const imageFile = req.file;

  if (!imageFile || !required_points || !type) {
    res.status(400).json({ error: "Missing data" });
    return;
  }
  const hash = crypto.createHash("md5").update(imageFile.buffer).digest("hex");

  try {
    const existingReward = await Reward.findOne({ where: { imageHash: hash } });

    if (existingReward) {
      res
        .status(400)
        .json({ error: "The image is already stored as a reward" });
      return;
    }
    const fileName = `${hash}_image.jpg`;
    const filePath = path.join(__dirname, "../uploads", fileName);

    await fs.ensureDir(path.join(__dirname, "../uploads"));
    await fs.writeFile(filePath, imageFile.buffer);

    const newReward = await Reward.create({
      image: filePath,
      imageHash: hash,
      required_points,
      type,
    });

    res.status(200).json(newReward);
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "Error saving image" });
  }
};

export const getAllReward = async (req: Request, res: Response) => {
  try {
    const rewardAll = await allRewardService();
    res.status(200).json(rewardAll);
  } catch (error: unknown) {
    res.status(500).json({ message: "An unexpected error has occurred" });
  }
};

export const getIdReward = async (req: Request, res: Response) => {
  const rewardId = parseInt(req.params.id, 10);
  try {
    const reward = await getRewardbyId(rewardId);
    res.status(200).json(reward);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error has occurred" });
    }
  }
};

export const updateDataRewardById = async (req: Request, res: Response) => {
  const rewardId = parseInt(req.params.id, 10);
  const { required_points } = req.body;

  if (isNaN(rewardId) || isNaN(required_points)) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
    const rewardUpdate = await updateDataReward(rewardId, required_points);
    if (rewardUpdate > 0) {
      res.status(200).json({ message: "Reward added successfully" });
    } else {
      res.status(404).json({ message: "Reward not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUnlockedRewardsForUser = async (
  req: Request,
  res: Response
) => {
  const { user_id } = req;
  const rewardType = req.query.type as string; 
  // const userId = parseInt(req.params.userId, 10);
  console.log(user_id);
  if (user_id === undefined || isNaN(user_id)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }
  console.log(rewardType)
  if (!rewardType) {
    res.status(400).json({ message: "Invalid reward type1" });
    return;
  }
  if (!rewardType || (rewardType !== "background" && rewardType !== "avatar")) {
    res.status(400).json({ message: "Invalid reward type" });
    return;
  }
  try {
    const rewardUnlocked = await getUnlockedRewardsServices(user_id,rewardType);
    console.log(rewardUnlocked);
    if (rewardUnlocked.length > 0) {
      res
        .status(200)
        .json({
          rewards: rewardUnlocked,
          message: "Rewards found successfully",
        });
    } else {
      res.status(404).json({ message: "No rewards unlocked for this user" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error has occurred" });
    }
  }
};

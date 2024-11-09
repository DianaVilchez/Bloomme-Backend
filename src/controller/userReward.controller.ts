import { Request, Response } from "express";

import { getRequiredPointsServices } from "../services/reward.service";
import { allUserRewardsServices, existingRewardServices, insertRewardUserServices } from "../services/userReward.service";

export const selectReward =  async(req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id);
    const rewardId = parseInt(req.params.reward_id);
    const rewardType = req.params.reward_type;
    console.log(userId)
    if (isNaN(userId) || isNaN(rewardId)) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return
    }
    try{
        const existingReward = await existingRewardServices(userId,rewardId)
        // Si ya existe la recompensa, retornamos un mensaje de error
        if (existingReward) {
            res.status(400).json({ error: "Reward already registered" });
            return
        }
        const pointsReward = await getRequiredPointsServices(rewardId)
        console.log(pointsReward)
        
        if (pointsReward === null) {
            res.status(404).json({ error: "Reward not found or does not have required points" });
        return
    }
        await insertRewardUserServices(userId,rewardId,rewardType)
       // await updateTotalpointsServices(userId,pointsReward)

        res.status(200).json({ message: "Reward selected successfully" });
    }catch(error){
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
}

export const allUserRewards = async(req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id);
    const type =req.params.reward_type;
    try{
        const allRewards = await allUserRewardsServices(userId, type)

        const rewardsIds = [...new Set(allRewards.map((reward) => reward.reward_id))]

        const response = {
            userID: userId,
            rewards_id: rewardsIds,
            reward_type: type
        }
        res.status(200).json(response);
    }catch(error){
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
import { Request, Response } from "express";
import { allUserRewardsServices, existingRewardServices, getAvailablePoints, getUnlockedRewardsServices, insertRewardUserServices, verifyRewardUserServices } from "../services/userReward.service";

export const selectReward =  async(req: Request, res: Response) => {
    const { user_id } = req;
    const rewardId = parseInt(req.query.reward_id as string);
    const rewardType =  req.query.reward_type as string;
    console.log(user_id)
    if (user_id === undefined ||isNaN(user_id) || isNaN(rewardId)) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return
    }
    try{
         const verifyPoints = await verifyRewardUserServices(user_id,rewardType)
         if (!verifyPoints || verifyPoints.length === 0) {
         res.status(400).json({ error: "User does not have the required points to select"})
         return; 
        }
        const existingReward = await existingRewardServices(user_id,rewardId)
        if (existingReward) {
            res.status(400).json({ error: "Reward already registered" });
            return
        }
        // const pointsReward = await getRequiredPointsServices(rewardId)
        // console.log(pointsReward)
        
        // if (pointsReward === null) {
        //     res.status(404).json({ error: "Reward not found or does not have required points" });
        // return
    // }
        await insertRewardUserServices(user_id,rewardId,rewardType)
        await getUnlockedRewardsServices(user_id)

       res.status(200).json({ message: "Reward selected successfully" });

    }catch(error){
        if(error instanceof Error){
            res.status(400).json({ message: error.message });
            return 
        }
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    return 
}  
}

export const allUserRewards = async(req: Request, res: Response) => {
    // const userId = parseInt(req.params.user_id);
    const { user_id } = req;
    const type =req.params.reward_type;
    if (user_id === undefined ||isNaN(user_id)) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return
    }
    try{
        const allRewards = await allUserRewardsServices(user_id, type)

        const rewardsIds = [...new Set(allRewards.map((reward) => reward.reward_id))]

        const response = {
            userID: user_id,
            rewards_id: rewardsIds,
            reward_type: type
        }
        res.status(200).json(response);
    }catch(error){
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const pointsAvailable = async(req: Request, res: Response) => {
    // const userId = parseInt(req.params.user_id);
    const { user_id } = req;

    if (user_id === undefined ||isNaN(user_id)) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return
    }
    try{
        const points = await getAvailablePoints(user_id)
        console.log(points)
        res.status(200).json(points);
    }catch(error){
        console.error("Error processing reward selection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


import { Op } from "sequelize";
import { Reward, User, UserReward } from "../models";
import { getAvailablePoints } from "./userReward.service";

export const allRewardService = async (): Promise<Reward[]> => {
    const allReward = await Reward.findAll();
    return allReward
}

export const getRewardbyId = async (id: number): Promise<Reward | null> => {
    const reward = await Reward.findOne({
        where: { reward_id: id}
    });
    if(!reward) {
        throw new Error('the reward does not exist')
    }
    return reward;
}

export const updateDataReward =async (id:number,newRequiredPoints: number): Promise<number> => {
    const [updateCount] = await Reward.update(
        {required_points : newRequiredPoints}, 
        {where: {reward_id : id}}
    );
    return updateCount;
}

export const getUnlockedRewardsServices = async (userId: number, rewardType: string): Promise<Reward[]> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const userPoints = await getAvailablePoints(userId);
    const unlockedRewardIds = await UserReward.findAll({
        where: { user_id: userId },
        attributes: ['reward_id'],
    }).then(rewards => rewards.map(reward => reward.reward_id));
   
    console.log("userPoints," ,userPoints)
    const unlockedRewards = await Reward.findAll({
        where:{
            required_points:{
                [Op.lte] :  userPoints
            },
            reward_id: { [Op.notIn]: unlockedRewardIds }
        }
    })
    return unlockedRewards;
}


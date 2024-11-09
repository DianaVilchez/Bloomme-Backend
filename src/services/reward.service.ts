import { Op } from "sequelize";
import { Reward, User, UserReward } from "../models";

export const allRewardService = async (): Promise<Reward[]> => {
    const allReward = await Reward.findAll();
    return allReward
}

export const getRewardbyId = async (id: number): Promise<Reward | null> => {
    const reward = await Reward.findOne({
        where: { reward_id: id}
    });
    return reward;
}

export const updateDataReward =async (id:number,newRequiredPoints: number): Promise<number> => {
    const [updateCount] = await Reward.update(
        {required_points : newRequiredPoints}, 
        {where: {reward_id : id}}
    );
    return updateCount;
}

export const getUnlockedRewardsServices = async (userId: number): Promise<Reward[]> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const userPoints = user.total_point;
    const unlockedRewards = await Reward.findAll({
        where:{
            required_points:{
                [Op.lte] :  userPoints
            }
        }
    })
    return unlockedRewards;
}

export const getRequiredPointsServices =  async (RewardId: number): Promise<number> =>{
    const rewardPoint = await Reward.findOne({
        where: { reward_id: RewardId},
        attributes: ['required_points']
    });
    if(!rewardPoint){
        throw new Error("Reward not found");
    }
    return rewardPoint.required_points;
    ;
}

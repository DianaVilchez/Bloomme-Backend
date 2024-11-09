import { User, UserReward } from "../models";

interface IUserReward{
    user_id:number,
    reward_id:number,
}

export const existingRewardServices = async(userId: number, rewardId: number) => {
    const existingReward = await UserReward.findOne({
        where: {
            user_id: userId,
            reward_id: rewardId,
        }
    });
    return existingReward
}
export const insertRewardUserServices = async(userId: number, rewardId: number,rewardType: string ):Promise<IUserReward> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
        const insertReward = await UserReward.create({
        user_id:userId,
        reward_id:rewardId,
        reward_type: rewardType,
    })
    return insertReward;
   
}
export const allUserRewardsServices = async(userId: number, type:string): Promise<UserReward[]>  => { 
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const allReward = await UserReward.findAll({
        where:{
            user_id:userId,
            reward_type: type,
        }
    });
    return allReward
}


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
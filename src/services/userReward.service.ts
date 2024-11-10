import { Op } from "sequelize";
import { Reward, User, UserReward } from "../models";

interface IUserReward{
    user_id:number,
    reward_id:number,
}
//obtener los puntos disponibles
export const getAvailablePoints = async (userId: number): Promise<number> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const totalPoints = user.total_point;

    if (totalPoints === undefined || totalPoints === null) {
        throw new Error('El usuario no tiene puntos');
    }

    const userRewards = await UserReward.findAll({
        where: { user_id: userId }
    });

    let pointsSpent = 0;

    if (userRewards.length > 0) {
        const rewardIds = userRewards.map(ur => ur.reward_id);

        const result = await Reward.findAll({
            where: {
                reward_id: rewardIds
            },
            attributes: ['required_points']
        });

        pointsSpent = result.reduce((total, userReward) => {
            return total + userReward.required_points;
        }, 0);
    }

    const availableUserPoints = totalPoints - pointsSpent;

    return availableUserPoints >= 0 ? availableUserPoints : 0;
}
    

export const verifyRewardUserServices = async(userId: number,rewardType: string ):Promise<Reward[]> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const userPoints = await getAvailablePoints(userId);
    const unlockedRewards = await Reward.findAll({
        where:{
            required_points:{
                [Op.lte] :  userPoints
            },
            type: rewardType
        }
    })
    return unlockedRewards;
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
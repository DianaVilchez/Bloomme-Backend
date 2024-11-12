import { Op, Sequelize } from 'sequelize';
import { Reward, User, UserReward } from "../models";

interface IUserReward{
    user_id:number,
    reward_id:number,
}

export const getAvailablePoints = async (userId: number): Promise<number> => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const totalPoints = user.total_point;
    console.log('totalPoints',totalPoints)

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
export const existingRewardServices = async(userId: number, rewardId: number) => {

    const existingReward = await UserReward.findOne({
        where: {
            user_id: userId,
            reward_id: rewardId,
        }
    });
    if (existingReward) {
        throw new Error("Reward is already registered");
    }
    return existingReward
}

export const selectUserRewardServices = async(userId: number, rewardId: number) => {
try{
    //verificar que tipo de reward es
    const reward = await Reward.findByPk(rewardId);
    if(!reward){
        throw new Error("Reward not found");
    }
    if (reward.type !== "avatar" && reward.type !== "background") {
        throw new Error("The selected reward is neither an avatar nor a background");
    }
    //si ya esta en la tabla userReward
    const userReward = await UserReward.findOne({
        where: {
            user_id: userId,
            reward_id: rewardId
        }
    });
    if (!userReward) {
        throw new Error("The user has not purchased this reward");
    }
    const updateData = reward.type === "avatar" 
            ? { current_avatar: reward.image } 
            : { current_background: reward.image };

        await User.update(
            updateData,
            { where: { user_id: userId } }
        );
    return { message: `Reward selected successfully: ${reward.type}` };

}catch(error){
    if (error instanceof Error) {
        console.error(error.message);
        throw error;
    } else {
        console.error("Error selecting a reward");
        throw new Error("Error selecting a reward");
    }
}
}


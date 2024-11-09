import { DataTypes, Model, Optional} from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Reward } from './Reward';



interface UserRewardAttributes {
    user_id:number;
    reward_id:number;
    reward_type:string;
}

interface UserRewardCreationAttributes extends Optional<UserRewardAttributes, 'user_id'| 'reward_id' | 'reward_type'> { }



class UserReward extends Model<UserRewardAttributes,UserRewardCreationAttributes> implements UserRewardAttributes{
    public user_id!:number;
    public reward_id!:number;
    public reward_type!:string;
}

UserReward.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        reward_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Reward,
                key: 'reward_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        reward_type:{
            type: DataTypes.STRING,
            allowNull: false,

        }
    },
    {
        sequelize,
        modelName: "UserReward",
        tableName: "user_reward",
        timestamps: true, 
    }

);

export {UserReward}
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User,Assistant, Reward} from '../models';
import { IUser } from '../interface/index.interface';
// import { Op } from 'sequelize';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const registerUser = async (userData: IUser) => {
    
    const existingUser = await User.findOne({
        where: {
            username: userData.username
        }
    });

    const assistant = await Assistant.findByPk(userData.assistant_id);
    if (!assistant) {
      throw new Error('Assistant not found');
    }

    if (existingUser) {
        throw new Error('The user name is already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({
        ...userData,
        password: hashedPassword,
        total_point: 0,
    });
    return newUser;
}



export const authenticateUser = async (email: string, password: string) => {
    const user = await User.findOne({
        where: {email}
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const tokenUser = jwt.sign({ user_id: user.user_id }, JWT_SECRET as string);
    return { user, tokenUser }
}

export const rewardDefaultServices= async(email: string, reward_type:'avatar' | 'background') => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    let defaultImage = '';
    let defaultImageHash = '';
    let updateField = '';

    if (reward_type === 'avatar') {
        defaultImage = 'https://i.ibb.co/FJdG9gH/15.png'; 
        defaultImageHash = 'default-avatar-hash1'; 
        updateField = 'current_avatar';  
    } else if (reward_type === 'background') {
        defaultImage = 'https://i.ibb.co/1nYTMLh/23.png';  
        defaultImageHash = 'default-background-hash2';  
        updateField = 'current_background'; 
    }
    try {
        const [reward,created] = await Reward.findOrCreate({
            where: { type: 'avatar' }, 
            defaults: {
                type: reward_type,
                image: 'defaultImage',
                imageHash: 'defaultImageHash',
                required_points: 0, 
              },
          });
          if (created) {
            console.log('Default avatar created in rewards.');
          } else {
            console.log('Default avatar already exists in rewards.');
          }
          await User.update(
            { [updateField]: defaultImage },  
            { where: { email } } 
        );
       
          return { message: 'Default avatar assigned successfully' };
      
}catch (error) {
    console.error('Error assigning default avatar:', error);
    throw new Error('Error assigning default avatar.');
  }
}



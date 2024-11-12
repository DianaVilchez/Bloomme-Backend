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

    // Verificar el tipo de reward y asignar valores predeterminados
    if (reward_type === 'avatar') {
        defaultImage = 'https://i.ibb.co/FJdG9gH/15.png';  // URL del avatar por defecto
        defaultImageHash = 'default-avatar-hash1';  // Hash del avatar
        updateField = 'current_avatar';  // Campo a actualizar en la tabla User
    } else if (reward_type === 'background') {
        defaultImage = 'https://i.ibb.co/1nYTMLh/23.png';  // URL del background por defecto
        defaultImageHash = 'default-background-hash2';  // Hash del background
        updateField = 'current_background';  // Campo a actualizar en la tabla User
    }
    try {
        const [reward,created] = await Reward.findOrCreate({
            where: { type: 'avatar' }, // Busca por el user_id y reward_type
            defaults: {
                type: reward_type,
                image: 'defaultImage',
                imageHash: 'defaultImageHash',
                required_points: 0, // URL del avatar por defecto
              },
          });
          if (created) {
            console.log('Default avatar created in rewards.');
          } else {
            console.log('Default avatar already exists in rewards.');
          }
          await User.update(
            { [updateField]: defaultImage },  // Establecer la imagen por defecto
            { where: { email } } // Actualizar al usuario con este email
        );
       
          return { message: 'Default avatar assigned successfully' };
      
}catch (error) {
    console.error('Error assigning default avatar:', error);
    throw new Error('Error assigning default avatar.');
  }
}



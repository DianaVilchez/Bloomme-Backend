import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';
import { IUser } from '../interface/index.interface';
import { Op } from 'sequelize';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const registerUser = async (userData: IUser) => {
    const existingUser = await User.findOne({
        where: {
            username: userData.username
        }
    });

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



export const authenticateUser = async (username: string, email: string, password: string) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    const tokenUser = jwt.sign({ user_id: user.user_id, username: user.username }, JWT_SECRET as string);
    return { user, tokenUser }
}



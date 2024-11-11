import { User } from "../models";
import { IUser } from '../interface/index.interface';
import bcrypt from 'bcrypt';

export const allUserService = async (): Promise<IUser[]> => {
        const allUser = await User.findAll();
        return allUser
}

export const updateUserService = async (id: number, data: IUser): Promise<IUser | null> => {
        const user = await User.findByPk(id);
        if (!user) {
                throw new Error('the user does not exist yet')
        }
        if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
        }

        const [affectedCount] = await User.update(data, {
                where: { user_id: id },
        });

        if (affectedCount === 0) {
                throw new Error('No user was updated.');
        }

        const updatedUser = await User.findByPk(id);
        return updatedUser;
}


export const getUserDetailsById = async (user_id: number) => {
        const user = await User.findByPk(user_id);
        if (!user) {
                throw new Error('User not found');
        }
        return user;
};
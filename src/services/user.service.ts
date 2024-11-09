import { User } from "../models";
import { IUser } from '../interface/index.interface';

export const allUserService = async (): Promise<IUser[]> => {
        const allUser = await User.findAll();
        return allUser
}

export const updateUserService = async (id: number, data: IUser): Promise<IUser | null> => {
        const user = await User.findByPk(id);
        if (!user) {
                throw new Error('the user does not exist')
        }
        const updatedUser = await user.update(data);
        return updatedUser;
}
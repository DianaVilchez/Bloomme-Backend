import { Request, Response } from 'express';
import { allUserService, updateUserService } from '../services/user.service';
import { IUser } from '../interface/index.interface';


export const getAllUser = async (req: Request, res: Response) => {
    try {
        const userAll = await allUserService();
        res.status(200).json(userAll)
    } catch (error: unknown) {
        res.status(500).json({ message: 'An unexpected error has occurred' });
    }

}

export const updateUserController = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const id = Number(user_id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid user ID' }); 
        return;
    }
    const userData: IUser = req.body;
    try {
        const updatedUser = await updateUserService(id, userData);

        res.status(200).json(updatedUser);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
}
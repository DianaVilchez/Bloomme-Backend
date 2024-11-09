import { Request, Response } from 'express';
import { authenticateUser, registerUser } from '../services/auth.service';


export const register = async (req: Request, res: Response) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const { username,email, password } = req.body;
    if(!username || !email || !password){
        res.status(400).json({ message: 'Please provide all required fields' });
        return ;
    }
    try {
        const { user, tokenUser } = await authenticateUser(username,email, password);
        res.status(200).json({ message: 'Successful login', user, tokenUser });
    } catch (error:unknown) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }

};

import { Request, Response } from 'express';
import { createPathService, getPathAllService } from '../services/path.service';

export const postPathController = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const newPath = await createPathService(name);
        res.status(201).json(newPath);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
}

export const getAllPathController = async (req: Request, res: Response) => {
    try {
        const pathAll = await getPathAllService();
        res.status(200).json(pathAll);
    } catch (error: unknown) {
        res.status(500).json({ message: 'An unexpected error has occurred' });
    }
} 
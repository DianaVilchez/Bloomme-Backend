import { Request, Response } from "express";
import { saveModuleScore } from "../services/module.service";


export const createModule = async (req: Request, res: Response) => {
    try {
        const newModule = await saveModuleScore(req.body);
        res.status(201).json(newModule);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error has occurred'});
        }
    }
}
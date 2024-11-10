import { Request, Response } from 'express';
import { createAssistant, getAllAssistant } from '../services/assistant.service';

export const createAssistantController = async (req: Request, res: Response) => {
    try {
        const newAssistant = await createAssistant(req.body);
        res.status(201).json(newAssistant);
    } catch (error:unknown) {
        if( error instanceof Error){
            res.status(400).json({message: error.message});
        }else{
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
};

export const getAssistants= async (req: Request, res: Response) => {
    try {
        const assistantAll = await getAllAssistant();
        res.status(200).json(assistantAll);
    } catch (error:unknown) {
        if( error instanceof Error){
            res.status(400).json({message: error.message});
        }else{
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
};
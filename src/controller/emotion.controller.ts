import { Request, Response } from "express";
import { createEmotion, getAllEmotions } from "../services/emotion.service";

export const createEmotionController = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newEmotion = await createEmotion(name);
    res.status(201).json(newEmotion);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Error creating emotion." });
    }
  }
};

export const getEmotionsController = async (req: Request, res: Response) => {
  try {
    const emotions = await getAllEmotions();  
    res.json(emotions);
  } catch (error) {
    console.error('Error fetching emotions:', error);
    res.status(500).json({ error: 'Error fetching emotions from the database' });
  }
};

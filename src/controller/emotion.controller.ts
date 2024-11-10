import { Request, Response } from "express";
import { createEmotion } from "../services/emotion.service";

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

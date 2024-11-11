import { Emotion } from "../models/Emotion";

export const createEmotion = async (name: string) => {
  return await Emotion.create({ name });
};

export const getAllEmotions = async (): Promise<Emotion[]> => {
  try {
    const emotions = await Emotion.findAll();  
    return emotions;  
  } catch (error) {
    console.error('Error fetching emotions:', error);
    throw new Error('Error fetching emotions from the database');
  }
};
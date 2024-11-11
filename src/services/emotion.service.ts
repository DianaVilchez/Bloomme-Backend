import { Emotion } from "../models/Emotion";

export const createEmotion = async (name: string) => {
  return await Emotion.create({ name });
};
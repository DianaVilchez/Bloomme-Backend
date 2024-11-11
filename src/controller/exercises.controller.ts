import { Request, Response } from "express";
import { createExerciseService, getExercisesByEmotion } from "../services/exercise.service";
import { generateEmotionExerciseText } from "../services/gemini.service";

export const createExerciseController = async (req: Request, res: Response) => {
    const { name, emotion_id } = req.body;

    try {
        const newExercise = await createExerciseService(name, emotion_id);

        res.status(201).json({
            message: "Exercise created successfully",
            exercise: newExercise,
        });
    } catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({ message: "An error occurred while creating the exercise" });
    }
};

export const generateExerciseTextController = async (req: Request, res: Response) => {
    const { emotion_id, exercises_id } = req.query;
  
    // if (!emotion_id || !exercises_id) {
    //   return res.status(400).json({ error: 'Emotion ID and Exercise ID are required' });
    // }
  
    try {
      const generatedText = await generateEmotionExerciseText(Number(emotion_id), Number(exercises_id));
  
      res.json({ text: generatedText });
    } catch (error) {
      console.error('Error generating the exercise text:', error);
      res.status(500).json({ error: 'Error generating the exercise text' });
    }
};

export const getExercisesByEmotionController = async (req: Request, res: Response) => {
    const { emotion_id } = req.params;  
    console.log('Emotion ID:', emotion_id)
    try {
      const exercises = await getExercisesByEmotion(Number(emotion_id)); 
      res.json(exercises); 
    } catch (error) {
      console.error('Error fetching exercises by emotion:', error);
      res.status(500).json({ error: 'Error fetching exercises from the database' });
    }
  };
  
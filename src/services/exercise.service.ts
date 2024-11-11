import { Exercises } from "../models";



export const createExerciseService = async (name: string, emotion_id: number) => {
    try {
        const newExercise = await Exercises.create({
            name,
            emotion_id,
        });

        return newExercise;
    } catch (error) {
        throw new Error("Error creating exercise. ");
    }
};

export const getExercisesByEmotion = async (emotion_id: number): Promise<Exercises[]> => {
    try {
      const exercises = await Exercises.findAll({
        where: { emotion_id }, 
      });
      
      if (exercises.length === 0) {
        throw new Error('No exercises found for this emotion');
      }
      console.log("Resultado de Exercises en getExercisesByEmotion",exercises);
      
      return exercises;
    } catch (error) {
      console.error('Error fetching exercises by emotion:', error);
      throw new Error('Error fetching exercises from the database');
    }
  };
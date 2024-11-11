import { Exercises } from "../models/Exercises";

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
import { Request, Response } from "express";
import { createExerciseService } from "../services/exercise.service";

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
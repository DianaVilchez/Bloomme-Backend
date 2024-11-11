import express from "express";
import { createExerciseController, generateExerciseTextController, getExercisesByEmotionController } from "../controller/exercises.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const exercisesRouter = express.Router();

exercisesRouter.post("/exercises", createExerciseController);
exercisesRouter.get('/generate-emotion-exercise-text',isAuthenticated, generateExerciseTextController);
exercisesRouter.get('/exercises/:emotion_id',isAuthenticated, getExercisesByEmotionController);
export { exercisesRouter };
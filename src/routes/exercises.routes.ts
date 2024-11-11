import express from "express";
import { createExerciseController } from "../controller/exercises.controller";
createExerciseController

const exercisesRouter = express.Router();

exercisesRouter.post("/exercises", createExerciseController);

export { exercisesRouter };
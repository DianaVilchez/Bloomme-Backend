import express, { Router } from "express";
import { createEmotionController, getEmotionsController } from "../controller/emotion.controller";

const emotionRouter: Router = express.Router();

emotionRouter.post("/emotions", createEmotionController);
emotionRouter.get('/emotions', getEmotionsController); 

export { emotionRouter};
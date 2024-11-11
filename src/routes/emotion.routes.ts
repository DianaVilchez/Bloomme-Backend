import express, { Router } from "express";
import { createEmotionController } from "../controller/emotion.controller";


const emotionRouter: Router = express.Router();

emotionRouter.post("/emotions", createEmotionController);

export { emotionRouter};
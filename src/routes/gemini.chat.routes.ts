import express, { Router } from 'express';
import { postResponseChat } from '../controller/gemini.chat.controller';

const chatRouter: Router = express.Router();

chatRouter.post('/chat/:user_id', postResponseChat);

export { chatRouter }
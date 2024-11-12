import express, { Router } from 'express';
import { postResponseChat } from '../controller/gemini.chat.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const chatRouter: Router = express.Router();

chatRouter.post('/chat/', isAuthenticated,postResponseChat);

export { chatRouter }
import express, { Router } from 'express';
import { createAssistantController, getAssistants } from '../controller/assistant.controller';

const assistantRouter: Router = express.Router();

assistantRouter.post('/assistant',createAssistantController);
assistantRouter.get('/assistant',getAssistants);

export {assistantRouter}
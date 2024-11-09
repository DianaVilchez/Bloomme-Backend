import express, { Router } from 'express';
import { getAllPathController, postPathController } from '../controller/path.controller';
// import { isAuthenticated } from '../middleware/auth.middleware';

const pathRouter: Router = express.Router();

pathRouter.post('/path',postPathController);
pathRouter.get('/path',getAllPathController)

export {pathRouter}
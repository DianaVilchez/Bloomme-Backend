import express, { Router } from 'express';
import { getAllPathController, postPathController } from '../controller/path.controller';
import { getModulesByPathController } from '../controller/module.controller';

const pathRouter: Router = express.Router();

pathRouter.post('/path',postPathController);
pathRouter.get('/path',getAllPathController)
pathRouter.get('/:path_id/modules', getModulesByPathController);
export {pathRouter}
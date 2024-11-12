import express, { Router } from 'express';
import { createModule, getAllModules, getModuleByIdController } from '../controller/module.controller';


const moduleRouter: Router = express.Router();

moduleRouter.post('/module', createModule)
moduleRouter.get('/modules', getAllModules)
moduleRouter.get('/module/:module_id',getModuleByIdController)
export {moduleRouter}
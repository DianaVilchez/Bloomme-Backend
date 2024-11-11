import express, { Router } from 'express';
import { createModule, getAllModules } from '../controller/module.controller';


const moduleRouter: Router = express.Router();

moduleRouter.post('/module', createModule)
moduleRouter.get('/modules', getAllModules)
export {moduleRouter}
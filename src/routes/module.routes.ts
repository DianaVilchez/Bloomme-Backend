import express, { Router } from 'express';
import { createModule } from '../controller/module.controller';

const moduleRouter: Router = express.Router();

moduleRouter.post('/module', createModule)

export {moduleRouter}
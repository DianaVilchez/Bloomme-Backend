import express, { Router } from 'express';
import { getAllUser, updateUserController } from '../controller/user.controller';

const userRouter: Router = express.Router();

userRouter.get('/user',getAllUser);
userRouter.put('/user/:user_id',updateUserController)

export {userRouter}
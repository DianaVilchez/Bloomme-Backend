import express, { Router } from 'express';
import { getAllUser, getUserScoreController, updateUserController } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRouter: Router = express.Router();

userRouter.get('/user',getAllUser);
userRouter.get('/user/score',isAuthenticated,getUserScoreController)
userRouter.put('/user/:user_id',updateUserController)

export {userRouter}
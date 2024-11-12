import express, { Router } from 'express';
import { getAllUser, getUserCurrentRewardController, getUserProfileController, updateUserController } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRouter: Router = express.Router();

userRouter.get('/user',getAllUser);
userRouter.get('/profile',isAuthenticated,getUserProfileController)
userRouter.put('/user/:user_id',updateUserController)
userRouter.get('/profile-reward/:type',isAuthenticated,getUserCurrentRewardController)
export {userRouter}
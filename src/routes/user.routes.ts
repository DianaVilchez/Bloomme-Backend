import express, { Router } from 'express';
import { getAllUser, getUserCurrentRewardController, getUserProfileController, updateUserController } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { getEmergencyNumbersController } from '../controller/emergency.controller';

const userRouter: Router = express.Router();

userRouter.get('/user',getAllUser);
userRouter.get('/profile',isAuthenticated,getUserProfileController)
userRouter.put('/user',isAuthenticated,updateUserController)
userRouter.get('/profile-reward/:type',isAuthenticated,getUserCurrentRewardController)
userRouter.get('/emergency-numbers',isAuthenticated, getEmergencyNumbersController);

export {userRouter}
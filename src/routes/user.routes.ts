import express, { Router } from 'express';
import { getAllUser, getUserProfileController, updateUserController } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRouter: Router = express.Router();

userRouter.get('/user',getAllUser);
userRouter.get('/profile',isAuthenticated,getUserProfileController)
userRouter.put('/user/:user_id',updateUserController)

export {userRouter}
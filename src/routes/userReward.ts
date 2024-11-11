import express, { Router } from 'express';
import { allUserRewards, pointsAvailable, selectReward } from '../controller/userReward.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRewardRouter : Router = express.Router();

userRewardRouter.get('/user-reward/select',isAuthenticated,selectReward);
userRewardRouter.get('/user-reward/:reward_type',isAuthenticated, allUserRewards);
userRewardRouter.get('/points-reward',isAuthenticated, pointsAvailable);

export{userRewardRouter}
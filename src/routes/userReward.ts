import express, { Router } from 'express';
import { allUserRewards, selectReward } from '../controller/userReward.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRewardRouter : Router = express.Router();

userRewardRouter.get('/user-reward/select',isAuthenticated,selectReward);
userRewardRouter.get('/user-reward/:user_id/:reward_type',allUserRewards);

export{userRewardRouter}
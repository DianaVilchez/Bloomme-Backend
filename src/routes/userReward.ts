import express, { Router } from 'express';
import { allUserRewards, selectReward } from '../controller/userReward.controller';

const userRewardRouter : Router = express.Router();

userRewardRouter.get('/user-reward/:user_id/:reward_id/:reward_type',selectReward);
userRewardRouter.get('/user-reward/:user_id/:reward_type',allUserRewards);

export{userRewardRouter}
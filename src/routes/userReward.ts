import express, { Router } from 'express';
import { allUserRewards, insertUserReward, pointsAvailable, selectUserReward} from '../controller/userReward.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const userRewardRouter : Router = express.Router();

userRewardRouter.get('/user-reward',isAuthenticated,insertUserReward);
userRewardRouter.get('/user-reward/:reward_type',isAuthenticated, allUserRewards);
userRewardRouter.get('/points-reward',isAuthenticated, pointsAvailable);
userRewardRouter.get('/select-reward/:reward_id',isAuthenticated, selectUserReward);



export{userRewardRouter}
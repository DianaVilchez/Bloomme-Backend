import express, { Router } from 'express';
import { getIdReward, getAllReward, getUnlockedRewardsForUser, storeReward, updateDataRewardById} from '../controller/reward.controller';
import multer from 'multer';
import { isAuthenticated } from '../middleware/auth.middleware';


const storage = multer.memoryStorage();
const upload = multer({ storage });

export const rewardRouter : Router = express.Router();

rewardRouter.post('/reward', upload.single('image'),storeReward);
rewardRouter.get('/allreward',getAllReward);
rewardRouter.get('/reward/:id',getIdReward);
rewardRouter.put('/reward/:id',updateDataRewardById);
rewardRouter.get('/unlocked-rewards',isAuthenticated,getUnlockedRewardsForUser);

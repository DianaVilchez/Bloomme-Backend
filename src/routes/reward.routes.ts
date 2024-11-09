import express, { Router } from 'express';
import { getIdReward, getAllReward, getUnlockedRewardsForUser, storeReward, updateDataRewardById } from '../controller/reward.controller';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const rewardRouter : Router = express.Router();

rewardRouter.post('/reward', upload.single('image'),storeReward);
rewardRouter.get('/allreward',getAllReward);
rewardRouter.get('/reward/:id',getIdReward);
rewardRouter.put('/reward/:id',updateDataRewardById);
rewardRouter.get('/reward/:userId/unlocked',getUnlockedRewardsForUser);


export{rewardRouter}
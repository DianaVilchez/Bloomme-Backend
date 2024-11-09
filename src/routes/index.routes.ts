import { Application} from "express";
import { quizCategoryRouter } from "./quizCategory.routes";
import { userRouter } from "./user.routes";
import { authRouter } from "./auth.routes";
import { rewardRouter } from "./reward.routes";
import { userRewardRouter } from "./userReward";
import { pathRouter } from "./path.routes";
import { moduleRouter } from "./module.routes";

function router(app: Application): void {
    app.use('/api', quizCategoryRouter);
    app.use('/api',userRouter);
    app.use('/api',authRouter);
    app.use('/api',rewardRouter)
    app.use('/api',userRewardRouter)
    app.use('/api',pathRouter);
    app.use('/api',moduleRouter);

  }
  
  export { router };
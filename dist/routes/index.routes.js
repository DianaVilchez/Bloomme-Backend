"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const quizCategory_routes_1 = require("./quizCategory.routes");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
const reward_routes_1 = require("./reward.routes");
const userReward_1 = require("./userReward");
const path_routes_1 = require("./path.routes");
const module_routes_1 = require("./module.routes");
function router(app) {
    app.use('/api', quizCategory_routes_1.quizCategoryRouter);
    app.use('/api', user_routes_1.userRouter);
    app.use('/api', auth_routes_1.authRouter);
    app.use('/api', reward_routes_1.rewardRouter);
    app.use('/api', userReward_1.userRewardRouter);
    app.use('/api', path_routes_1.pathRouter);
    app.use('/api', module_routes_1.moduleRouter);
}

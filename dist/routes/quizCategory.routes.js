"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const quizCategory_controller_1 = require("../controller/quizCategory.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const quizCategoryRouter = express_1.default.Router();
exports.quizCategoryRouter = quizCategoryRouter;
quizCategoryRouter.post('/quiz-score', quizCategory_controller_1.createQuizScore);
quizCategoryRouter.get('/quiz-categories', quizCategory_controller_1.getAllQuizCategories);
quizCategoryRouter.get('/quiz/:type/:type_id', auth_middleware_1.isAuthenticated, quizCategory_controller_1.getQuizQuestions);
quizCategoryRouter.post('/finish-quiz/:type/:type_id', auth_middleware_1.isAuthenticated, quizCategory_controller_1.finishQuiz);
quizCategoryRouter.put('/quiz-score/:quiz_id', quizCategory_controller_1.updateQuizScore);

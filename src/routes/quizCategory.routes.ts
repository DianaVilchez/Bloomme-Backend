import express, { Router } from 'express';
import { createQuizScore, finishQuiz, getAllQuizCategories, getQuizQuestions, updateQuizScore } from '../controller/quizCategory.controller';
import { isAuthenticated } from '../middleware/auth.middleware';


const quizCategoryRouter: Router = express.Router();

quizCategoryRouter.post('/quiz-score',createQuizScore);

quizCategoryRouter.get('/quiz-categories', getAllQuizCategories);
quizCategoryRouter.get('/quiz/:type/:type_id', isAuthenticated ,getQuizQuestions);
quizCategoryRouter.post('/finish-quiz/:type/:type_id',isAuthenticated, finishQuiz);

quizCategoryRouter.put('/quiz-score/:quiz_id', updateQuizScore);

export {quizCategoryRouter}
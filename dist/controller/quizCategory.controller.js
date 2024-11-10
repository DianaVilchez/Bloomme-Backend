"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizScore = exports.finishQuiz = exports.getAllQuizCategories = exports.getQuizQuestions = exports.createQuizScore = void 0;
const quizCategory_service_1 = require("../services/quizCategory.service");
const quizCategory_service_2 = require("../services/quizCategory.service");
const createQuizScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { score, name } = req.body;
    try {
        const newScore = yield (0, quizCategory_service_2.saveQuizScore)(score, name);
        res.status(201).json(newScore);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ error: "Error saving score." });
        }
    }
});
exports.createQuizScore = createQuizScore;
const getQuizQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, type_id } = req.params;
    const numericId = parseInt(type_id);
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'The ID provided is not a valid number.' });
        return;
    }
    try {
        yield (0, quizCategory_service_2.generateQuestionsByType)(type, numericId);
        res.json({ mesage: "quiz questions and answers created and saved" });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Category not found') {
                res.status(404).json({ error: error.message });
            }
            else if (error.message === 'Module not found') {
                res.status(404).json({ error: error.message });
            }
            else if (error.message === 'Invalid type. Must be "category" or "module".') {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
        else {
            res.status(500).json({ error: 'There was an error generating the quiz.' });
        }
    }
});
exports.getQuizQuestions = getQuizQuestions;
const getAllQuizCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, quizCategory_service_2.getAllQuizCategoriesService)();
        res.status(200).json(categories);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ error: 'Error getting quiz categories.' });
        }
    }
});
exports.getAllQuizCategories = getAllQuizCategories;
const finishQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAnswers } = req.body;
    const { type, type_id } = req.params;
    const { user_id } = req;
    const numericId = parseInt(type_id);
    if (!user_id || isNaN(user_id)) {
        res.status(400).json({ error: 'The user ID is invalid.' });
        return;
    }
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'The ID provided is not a valid number.' });
        return;
    }
    if (!type_id || !userAnswers || !type || userAnswers.length === 0) {
        res.status(400).json({ error: 'There is not enough data to complete the quiz.' });
    }
    try {
        const score = yield (0, quizCategory_service_1.calculateUserScore)(type, numericId, userAnswers, user_id);
        res.json({ message: "Quiz finished", score });
    }
    catch (error) {
        console.error("Error calculating score:", error);
        res.status(500).json({ error: "There was an error calculating the score." });
    }
});
exports.finishQuiz = finishQuiz;
// Controlador para actualizar una categoría de quiz
const updateQuizScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quiz_id } = req.params; // Obtener quiz_id de los parámetros
    const { name, score } = req.body;
    try {
        const updatedCategory = yield (0, quizCategory_service_1.updateQuizCategory)(Number(quiz_id), name, score);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ error: "Error updating quiz category." });
        }
    }
});
exports.updateQuizScore = updateQuizScore;

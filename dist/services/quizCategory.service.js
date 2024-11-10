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
exports.updateQuizCategory = exports.calculateUserScore = exports.getAllQuizCategoriesService = exports.generateQuestionsByType = exports.saveQuizScore = void 0;
const models_1 = require("../models");
const gemini_service_1 = require("./gemini.service");
const saveQuizScore = (score, nameCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const existingScore = yield models_1.QuizCategory.findOne({ where: { name: nameCategory } });
    if (existingScore) {
        throw new Error(`A record already exists for the category name '${nameCategory}'.`);
    }
    return yield models_1.QuizCategory.create({ score, name: nameCategory });
});
exports.saveQuizScore = saveQuizScore;
const generateQuestionsByType = (type, id) => __awaiter(void 0, void 0, void 0, function* () {
    let name;
    if (type === 'category') {
        const category = yield models_1.QuizCategory.findByPk(id);
        if (!category) {
            throw new Error('Quiz category with the specified ID not found.');
        }
        name = category.name;
    }
    else if (type === 'module') {
        const module = yield models_1.Module.findByPk(id);
        if (!module) {
            throw new Error('Module with the specified ID not found.');
        }
        name = module.name;
    }
    else {
        throw new Error('Invalid type specified. Expected "category" or "module".');
    }
    yield (0, gemini_service_1.generateQuizQuestions)(name, type, id);
});
exports.generateQuestionsByType = generateQuestionsByType;
const getAllQuizCategoriesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.QuizCategory.findAll();
});
exports.getAllQuizCategoriesService = getAllQuizCategoriesService;
const calculateUserScore = (type, type_id, userAnswers, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let quizScore;
    if (type === 'category') {
        const quizCategory = yield models_1.QuizCategory.findByPk(type_id);
        if (!quizCategory) {
            throw new Error('CQuiz category with the specified ID not found.');
        }
        quizScore = quizCategory.score;
    }
    else if (type === 'module') {
        const module = yield models_1.Module.findByPk(type_id);
        if (!module) {
            throw new Error('Module with the specified ID not found.');
        }
        quizScore = module.point;
    }
    else {
        throw new Error('Invalid type specified. Expected "category" or "module".');
    }
    const questions = yield models_1.Question.findAll({
        where: { type, type_id },
        include: [{ model: models_1.Option, as: 'Options' }]
    });
    if (questions.length === 0)
        throw new Error('No questions found for the specified type ID.');
    const pointsPerQuestion = quizScore / questions.length;
    let totalScore = 0;
    // Validar respuestas
    for (const userAnswer of userAnswers) {
        const question = questions.find(question => question.question_id === userAnswer.question_id);
        if (!question)
            continue;
        const correctOption = question.Options.find(option => option.is_correct === true);
        if (!correctOption) {
            console.error(`No correct option found for question ID '${question.question_id}'`);
            continue;
        }
        const selectOption = yield models_1.Option.findByPk(userAnswer.answer);
        if ((selectOption === null || selectOption === void 0 ? void 0 : selectOption.option_id) === correctOption.option_id) {
            totalScore += pointsPerQuestion;
        }
    }
    // Actualizar el total de puntos del usuario
    const user = yield models_1.User.findByPk(user_id);
    if (user) {
        user.total_point = (user.total_point || 0) + totalScore;
        yield user.save();
    }
    return totalScore;
});
exports.calculateUserScore = calculateUserScore;
const updateQuizCategory = (quizId, name, score) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield models_1.QuizCategory.findOne({ where: { quiz_id: quizId } });
    if (!existingCategory) {
        throw new Error(`No record found for the category with id '${quizId}'.`);
    }
    // Actualizar solo los campos que se proporcionan
    if (score !== undefined)
        existingCategory.score = score;
    if (name)
        existingCategory.name = name;
    yield existingCategory.save(); // Guardar cambios en la base de datos
    return existingCategory;
});
exports.updateQuizCategory = updateQuizCategory;

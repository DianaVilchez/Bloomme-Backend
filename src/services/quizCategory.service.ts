import { QuizCategory, Module, Question, Option, User } from "../models";
import { generateQuizQuestions } from "./gemini.service";

export const saveQuizScore = async (score: number, nameCategory: string) => {
    const existingScore = await QuizCategory.findOne({ where: { name: nameCategory } });
    if (existingScore) {
        throw new Error(`A record already exists for the category name '${nameCategory}'.`)
    }
    return await QuizCategory.create({ score, name: nameCategory });
}

export const generateQuestionsByType = async (type: string, id: number) => {
    let name: string;
    if (type === 'category') {
        const category = await QuizCategory.findByPk(id);
        if (!category) {
            throw new Error('Quiz category with the specified ID not found.');
        }
        name = category.name;
    } else if (type === 'module') {
        const module = await Module.findByPk(id);
        if (!module) {
            throw new Error('Module with the specified ID not found.');
        }
        name = module.name;
    } else {
        throw new Error('Invalid type specified. Expected "category" or "module".');
    }

    return await generateQuizQuestions(name, type, id);
};

export const getAllQuizCategoriesService = async () => {
    return await QuizCategory.findAll();
};

export const calculateUserScore = async (type: string, type_id: number, userAnswers: { question_id: number, answer: number }[], user_id: number) => {

    let quizScore: number;
    if (type === 'category') {
        const quizCategory = await QuizCategory.findByPk(type_id);
        if (!quizCategory) {
            throw new Error('CQuiz category with the specified ID not found.');
        }
        quizScore = quizCategory.score;
    } else if (type === 'module') {
        const module = await Module.findByPk(type_id);
        if (!module) {
            throw new Error('Module with the specified ID not found.');
        }
        quizScore = module.point;
    } else {
        throw new Error('Invalid type specified. Expected "category" or "module".');
    }

    const questions = await Question.findAll({
        where: { type, type_id },
        include: [{ model: Option, as: 'Options' }]
    });

    if (questions.length === 0) throw new Error('No questions found for the specified type ID.');
    const pointsPerQuestion = quizScore / 3;
    let totalScore = 0;

    for (const userAnswer of userAnswers) {
        const question = questions.find(question => question.question_id === userAnswer.question_id);
        if (!question) continue;
        const correctOption = question.Options.find(option => option.is_correct === true);
        if (!correctOption) {
            console.error(`No correct option found for question ID '${question.question_id}'`);
            continue;
        }
        const selectOption = await Option.findByPk(userAnswer.answer);
        if (selectOption?.option_id === correctOption.option_id) {
            totalScore += pointsPerQuestion;
        }
    }

    const user = await User.findByPk(user_id);
    if (user) {
        user.total_point = (user.total_point || 0) + totalScore;
        if (type === 'category') {
            user.quiz_completed = (user.quiz_completed || 0) + 1;
        }
        await user.save();
    }

    return totalScore;
};

export const updateQuizCategory = async (quizId: number, name?: string, score?: number) => {
    const existingCategory = await QuizCategory.findOne({ where: { quiz_id: quizId } });

    if (!existingCategory) {
        throw new Error(`No record found for the category with id '${quizId}'.`);
    }

    if (score !== undefined) existingCategory.score = score;
    if (name) existingCategory.name = name;

    await existingCategory.save();
    return existingCategory;
};


export const lastGenerateQuestion = async (type_id: number) => {
    const lastQuestion = await Question.findAll({
        where: { type_id },
        order: [['createdAt', 'DESC']],
        limit: 3,
        include: [{ model: Option, as: 'Options' }]
    });
    return lastQuestion;
}


export const addScoreToUser = async (user_id: number, score: number) => {
    const user = await User.findByPk(user_id);
    if (!user) {
        throw new Error('User not found')
    }
    user.total_point = (user.total_point || 0) + score;
    await user.save();

    return user;
}
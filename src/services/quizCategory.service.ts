import { QuizCategory, Module, Question, Option, User } from "../models";
import { generateQuizQuestions } from "./gemini.service";

export const saveQuizScore = async (score: number, nameCategory: string) => {
    const existingScore = await QuizCategory.findOne({ where: { name: nameCategory } });
    if (existingScore) {
            throw new Error (`This name  already has a record in the category "${nameCategory}".`)
    }
    return await QuizCategory.create({ score, name: nameCategory });
}

export const generateQuestionsByType = async (type: string, id: number) => {
    let name: string;
    if (type === 'category') {
        const category = await QuizCategory.findByPk(id);
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        name = category.name;
    } else if (type === 'module') {
        const module = await Module.findByPk(id);
        if (!module) {
            throw new Error('Módulo no encontrado');
        }
        name = module.name;
    } else {
        throw new Error('Tipo inválido. Debe ser "category" o "module".');
    }
    await generateQuizQuestions(name, type, id);
};

export const getAllQuizCategoriesService = async () => {
    return await QuizCategory.findAll();
};

export const calculateUserScore = async (type: string, type_id: number, userAnswers: { question_id: number, answer: number }[], user_id: number) => {
    
    let quizScore: number;
    if (type === 'category') {
        const quizCategory = await QuizCategory.findByPk(type_id);
        if (!quizCategory) {
            throw new Error('Categoría no encontrada');
        }
        quizScore = quizCategory.score;
    } else if (type === 'module') {
        const module = await Module.findByPk(type_id);
        if (!module) {
            throw new Error('Módulo no encontrado');
        }
        quizScore = module.point;
    } else {
        throw new Error('Tipo inválido. Debe ser "category" o "module".');
    }

    const questions = await Question.findAll({
        where: { type, type_id },
        include: [{ model: Option, as: 'Options' }]
    });

    if(questions.length === 0) throw new Error ('No se encontraron preguntas para ese tipo id');
    const pointsPerQuestion = quizScore / questions.length;
    let totalScore = 0;

    // Validar respuestas
    for (const userAnswer of userAnswers) {
        const question = questions.find(question => question.question_id === userAnswer.question_id);
        if (!question) continue;
        const correctOption = question.Options.find(option => option.is_correct === true );
        if(!correctOption){
            console.error ('No se encontraron opciones correctas para la pregunta');
            continue;
        }
        const selectOption = await Option.findByPk(userAnswer.answer);
        if(selectOption?.option_id === correctOption.option_id) {
            totalScore += pointsPerQuestion;
        }
    }

    // Actualizar el total de puntos del usuario
    const user = await User.findByPk(user_id);
    if (user) {
        user.total_point = (user.total_point || 0) + totalScore;
        await user.save();
    }

    return totalScore;
};
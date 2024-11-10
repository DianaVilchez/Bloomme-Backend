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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuizQuestions = exports.getModuleContent = exports.getQuizIdByCategory = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const Option_1 = require("../models/Option");
const Question_1 = require("../models/Question");
dotenv_1.default.config();
console.log("GEMINI_API_KEY desde .env:", process.env.GEMINI_API_KEY);
if (!process.env.GEMINI_API_KEY) {
    throw new Error('La clave de API GEMINI_API_KEY no está definida en el archivo .env');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("genAI instancia:", genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const getQuizIdByCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const quizCategory = yield models_1.QuizCategory.findOne({
        where: { name }
    });
    return quizCategory ? quizCategory.quiz_id : null;
});
exports.getQuizIdByCategory = getQuizIdByCategory;
const getModuleContent = (module_id) => __awaiter(void 0, void 0, void 0, function* () {
    const module = yield models_1.Module.findOne({
        where: { module_id },
    });
    return module ? module.content : null;
});
exports.getModuleContent = getModuleContent;
const generateQuizQuestions = (name, type, type_id) => __awaiter(void 0, void 0, void 0, function* () {
    let prompt;
    if (type === "category") {
        prompt = `
      Generate 3 trivia questions about the topic: ${name}.
      Each question should have 4 answer options, with one marked as correct.
      Format the response in JSON with the following format:
    [
      {
        "question": "Question text",
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "correct option"
      },
      ...
    ]
  `;
    }
    else if (type === "module") {
        const moduleContent = yield (0, exports.getModuleContent)(type_id);
        if (!moduleContent) {
            throw new Error('No se encontró el contenido del módulo');
        }
        prompt = `
      Generate 3 trivia questions based on the following module content: ${moduleContent}.
      Each question should have 4 answer options, with one marked as correct.
      Format the response in JSON with the following format:
    [
      {
        "question": "Question text",
        "options": ["option1", "option2", "option3", "option4"],
        "correctAnswer": "correct option"
      },
      ...
    ]
  `;
    }
    else {
        throw new Error('Tipo inválido. Debe ser "category" o "module".');
    }
    try {
        const result = yield model.generateContent([
            { text: prompt }
        ]);
        const generatedText = result.response.text();
        const cleanedText = generatedText.replace(/```json|```/g, '').trim();
        const questions = JSON.parse(cleanedText);
        const quiz_id = type === 'category' ? yield (0, exports.getQuizIdByCategory)(name) : type_id;
        if (!quiz_id) {
            throw new Error('No quiz_id found for category');
        }
        for (const questionData of questions) {
            const { question, options, correctAnswer } = questionData;
            const createQuestion = yield Question_1.Question.create({
                question_text: question,
                type: type,
                type_id: type_id,
            });
            for (let i = 0; i < options.length; i++) {
                const isCorrect = options[i] === correctAnswer;
                yield Option_1.Option.create({
                    option_text: options[i],
                    question_id: createQuestion.question_id,
                    is_correct: isCorrect
                });
            }
        }
    }
    catch (error) {
        console.error('Error parsing the model response:', error);
        throw new Error('Error in the response format.');
    }
});
exports.generateQuizQuestions = generateQuizQuestions;

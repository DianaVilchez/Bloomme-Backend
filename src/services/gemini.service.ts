import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { Module, QuizCategory } from '../models';
import { Option } from '../models/Option';
import { Question } from '../models/Question';


dotenv.config();
console.log("GEMINI_API_KEY desde .env:", process.env.GEMINI_API_KEY);
if (!process.env.GEMINI_API_KEY) {
  throw new Error('La clave de API GEMINI_API_KEY no está definida en el archivo .env');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("genAI instancia:", genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const getQuizIdByCategory = async (name: string): Promise<number | null> => {
  const quizCategory = await QuizCategory.findOne({
    where: { name }
  });

  return quizCategory ? quizCategory.quiz_id : null;
}
export const getModuleContent = async (module_id: number): Promise<string | null> => {
  const module = await Module.findOne({
    where: { module_id },
  });
  return module ? module.content : null;
}

export const generateQuizQuestions = async (name: string, type: string, type_id: number) => {
  let prompt: string;
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
  } else if (type === "module") {
    const moduleContent = await getModuleContent(type_id);
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
  } else {
    throw new Error('Tipo inválido. Debe ser "category" o "module".');
  }


  try {
    const result = await model.generateContent([
      { text: prompt }
    ]);

    const generatedText = result.response.text();

    const cleanedText = generatedText.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(cleanedText);

    const quiz_id = type === 'category' ? await getQuizIdByCategory(name) : type_id;

    if (!quiz_id) {
      throw new Error('No quiz_id found for category')
    }

    for (const questionData of questions) {
      const { question, options, correctAnswer } = questionData;

      const createQuestion = await Question.create({
        question_text: question,
        type: type,
        type_id: type_id,
      });
      for (let i = 0; i < options.length; i++) {
        const isCorrect = options[i] === correctAnswer;

        await Option.create({
          option_text: options[i],
          question_id: createQuestion.question_id,
          is_correct: isCorrect
        })
      }
    }
  } catch (error) {
    console.error('Error parsing the model response:', error);
    throw new Error('Error in the response format.');
  }
};


import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { QuizCategory } from '../models';
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

export const generateQuizQuestions = async (name: string, type: string, type_id: number) => {

  const prompt = `
    Genera 3 preguntas de trivia sobre el tema: ${name}.
    Cada pregunta debe tener 4 opciones de respuesta, con una marcada como la correcta.
    Formatea la respuesta en JSON con el siguiente formato:
    [
      {
        "question": "Texto de la pregunta",
        "options": ["opción1", "opción2", "opción3", "opción4"],
        "correctAnswer": "opción correcta"
      },
      ...
    ]
  `;

  const result = await model.generateContent([
    { text: prompt }
  ]);
  console.log("Resultado de la API:", result);
  const generatedText = result.response.text();
  console.log("Texto generado bruto:", generatedText);
  const cleanedText = generatedText.replace(/```json|```/g, '').trim();
  console.log("Texto generado limpio:", cleanedText);
  try {
    const questions = JSON.parse(cleanedText);

    const quiz_id = await getQuizIdByCategory(name);
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


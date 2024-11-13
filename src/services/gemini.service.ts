import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { Emotion, Exercises, Module, QuizCategory } from "../models";
import { Option } from "../models/Option";
import { Question } from "../models/Question";

dotenv.config();
// console.log("GEMINI_API_KEY desde .env:", process.env.GEMINI_API_KEY);
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "The API key GEMINI_API_KEY is not defined in the .env file"
  );
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("genAI instancia:", genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getQuizIdByCategory = async (
  name: string
): Promise<number | null> => {
  const quizCategory = await QuizCategory.findOne({
    where: { name },
  });

  return quizCategory ? quizCategory.quiz_id : null;
};
export const getModuleContent = async (
  module_id: number
): Promise<string | null> => {
  const module = await Module.findOne({
    where: { module_id },
  });
  return module ? module.content : null;
};

export const generateQuizQuestions = async (
  name: string,
  type: string,
  type_id: number
) => {
  let prompt: string;
  if (type === "category") {
    prompt = `
      Generate 3 fun and engaging trivia questions about the topic: ${name}., 
      designed specifically for young girls and teenagers.      
      Make sure each question is simple, clear, and age-appropriate, with answers that are easy to understand. 
      The questions should focus on empowering and educating young people in a safe and positive environment, addressing important topics related to women's health, identity, and body.
      Each question should have 4 answer options, with one clearly marked as the correct answer. 
      The style should be friendly, encouraging, and uplifting, ensuring that the tone is supportive and respectful of sensitive topics.
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
      throw new Error("Module content not found");
    }

    prompt = `
      Generate 3 engaging and supportive trivia questions based on the topic: ${moduleContent}.
      Design each question to be accessible, age-appropriate, and specifically tailored for girls and teens.
      Use a friendly, encouraging, and thought-provoking style to create a safe and welcoming learning experience.
      Each question should include 4 answer options, with one clearly marked as the correct answer.

      Provide the result in JSON format with the following structure:    
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
    throw new Error('Invalid type. Must be "category" or "module".');
  }

  try {
    const result = await model.generateContent([{ text: prompt }]);

    const generatedText = result.response.text();

    const cleanedText = generatedText.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(cleanedText);

    const quiz_id =
      type === "category" ? await getQuizIdByCategory(name) : type_id;

    if (!quiz_id) {
      throw new Error("No quiz_id found for category");
    }
    type Option = { option_text: string; is_correct: boolean };
    type QuestionWithOptions = { question_text: string; options: Option[] };

    const savedQuestions: QuestionWithOptions[] = [];

    for (const questionData of questions) {
      const { question, options, correctAnswer } = questionData;

      const createQuestion = await Question.create({
        question_text: question,
        type: type,
        type_id: type_id,
      });

      const questionWithOptions: QuestionWithOptions = {
        question_text: question,
        options: [],
      };

      for (let i = 0; i < options.length; i++) {
        const isCorrect = options[i] === correctAnswer;

        const option: Option = {
          option_text: options[i],
          is_correct: isCorrect,
        };
        await Option.create({
          option_text: options[i],
          question_id: createQuestion.question_id,
          is_correct: isCorrect,
        });
        questionWithOptions.options.push(option);
      }
      savedQuestions.push(questionWithOptions);
    }
    return savedQuestions;
  } catch (error) {
    // console.error("Error parsing the model response:", error);
    throw new Error("Error in the response format.");
  }
};

export const generateEmotionExerciseText = async (
  emotion_id: number,
  exercises_id: number
): Promise<string> => {
  const emotion = await Emotion.findOne({
    where: { emotion_id: emotion_id },
  });
  if (!emotion) {
    throw new Error("Emotion not found in the database.");
  }

  const exercise = await Exercises.findOne({
    where: { exercises_id: exercises_id },
  });
  if (!exercise) {
    throw new Error("Exercise not found in the database.");
  }

  const prompt = `Write a comforting message for a young girl or teenager who is feeling ${emotion.name}. Kindly suggest the exercise "${exercise.name}" with a step-by-step guide that is easy to follow. The message should be written in a friendly, understanding tone and explain why this exercise can help her feel better. Add words of encouragement and let her know it’s okay to feel this way. Also make this answer no more than 10 lines.`;

  try {
    const result = await model.generateContent([{ text: prompt }]);
    const generatedText = result.response.text();

    return generatedText;
  } catch (error) {
    // console.error('Error generating the text:', error);
    throw new Error("Error generating text with AI.");
  }
};

export const generateNumberEmergency = async (country: string) => {
  const prompt = `
      Provide the emergency numbers for the country: ${country}.
    The response should be in JSON format with the following structure:

    {
      "country": "Country name",
      "emergencyNumbers": {
        "general": "General emergency number",
        "violenceAgainstWomenAndGirls": "Number for violence against women and girls",
        "mentalHealthCrisis": "Emergency number for anxiety/depression crisis (or 'Not available' if not available)"
      }
    }

    Example response in JSON:
    {
      "country": "Argentina",
      "emergencyNumbers": {
        "general": "911",
        "violenceAgainstWomenAndGirls": "144",
        "mentalHealthCrisis": "135"
      }
    }
    `;
  try {
    const result = await model.generateContent([{ text: prompt }]);
    const emergencyNumbersText = result.response.text();
    const cleanedTextNumber = emergencyNumbersText.replace(/```json|```/g, "").trim();
    const emergencyNumbers = JSON.parse(cleanedTextNumber);

    emergencyNumbers.emergencyNumbers = {
      general: emergencyNumbers.emergencyNumbers.general || "Not available",
      violenceAgainstWomenAndGirls: emergencyNumbers.emergencyNumbers.violenceAgainstWomenAndGirls || "Not available",
      mentalHealthCrisis: emergencyNumbers.emergencyNumbers.mentalHealthCrisis || "Not available",
    };

    // console.log("geminumber",emergencyNumbers)
    return emergencyNumbers;
  } catch (error) {
    throw new Error("Error in the response format.");
  }
};


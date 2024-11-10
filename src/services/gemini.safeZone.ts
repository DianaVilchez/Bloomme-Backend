const { GoogleGenerativeAI } = require("@google/generative-ai");
import dotenv from 'dotenv';

dotenv.config();
console.log("GEMINI_API_KEY desde .env:", process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
    throw new Error('La clave de API GEMINI_API_KEY no está definida en el archivo .env');
  }
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = `Generame un ejercicio de para alguien que se siente ${emocion_name} y quiere hacer un ejerccio de ${accion_name}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
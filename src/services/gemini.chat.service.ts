import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
 export const ConnectionGeminiChat = async(message:string,history: Array<{ role: string; parts: Array<{ text: string }> }>) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('La clave de API GEMINI_API_KEY no está definida en el archivo .env');
      }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        const userMessage = message;
        if(!userMessage) {
            throw new Error('Not exist message')
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const generationConfig = {
            maxOutputTokens: 500,  
            temperature: 0.7      
        };

        const chat = model.startChat({
            history: [
                ...history,
                {
                    role:'user',
                    parts: [{ text: userMessage }]
                }
            ],
            generationConfig: generationConfig
        })
        return chat
    }catch{
        throw new Error('Error processing message ')
    }
 }
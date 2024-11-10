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
exports.ConnectionGeminiChat = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const ConnectionGeminiChat = (message, history) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('La clave de API GEMINI_API_KEY no está definida en el archivo .env');
    }
    const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const userMessage = message;
        if (!userMessage) {
            throw new Error('Not exist message');
        }
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const generationConfig = {
            maxOutputTokens: 500, // Si no se pasa, usa 100 como predeterminado
            temperature: 0.7 // Si no se pasa, usa 0.7 como predeterminado
        };
        const chat = model.startChat({
            history: [
                ...history,
                {
                    role: 'user',
                    parts: [{ text: userMessage }]
                }
            ],
            generationConfig: generationConfig
        });
        return chat;
    }
    catch (_a) {
        throw new Error('Error processing message ');
    }
});
exports.ConnectionGeminiChat = ConnectionGeminiChat;

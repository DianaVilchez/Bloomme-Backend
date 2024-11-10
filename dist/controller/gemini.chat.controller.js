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
exports.postResponseChat = void 0;
const gemini_chat_service_1 = require("../services/gemini.chat.service");
const conversationHistory = new Map();
// const conversationHistory = new Map();
const postResponseChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userMessage = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    const userId = req.params.user_id;
    const userIdStr = userId.toString();
    if (!userMessage) {
        res.status(400).json({ error: 'Message is required' });
        return;
    }
    const userHistory = conversationHistory.get(userIdStr) || [
        {
            role: "user",
            parts: [{ text: "From now on, respond as if you were a girl between 8 and 18 years old. Respond clearly and simply, only on topics appropriate for my age. If I ask about sensitive or difficult topics like sexuality, menstruation, relationships, and self-care, explain them carefully and without inappropriate details. If any question includes insults or offensive words, just tell me that it is not correct and respond kindly and respectfully." }]
        }
    ];
    try {
        const connectionGemini = yield (0, gemini_chat_service_1.ConnectionGeminiChat)(userMessage, userHistory);
        const result = yield connectionGemini.sendMessage(userMessage);
        const response = yield result.response;
        const modelReply = response.text();
        // Almacena la respuesta en el historial
        userHistory.push({ role: 'user', parts: [{ text: userMessage }] }, { role: 'model', parts: [{ text: modelReply }] });
        conversationHistory.set(userIdStr, userHistory);
        res.json({ reply: modelReply });
    }
    catch (error) {
        console.error('Error communicating with Gemini:', error);
        if (error instanceof Error && error.message.includes("SAFETY")) {
            res.status(400).json({
                message: "It seems your question contains a sensitive topic. Could you please rephrase it in a more general or softer way so I can assist you better?",
            });
        }
        else {
            res.status(500).json({ error: "Error processing the request" });
        }
    }
});
exports.postResponseChat = postResponseChat;

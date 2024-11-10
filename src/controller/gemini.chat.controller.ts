import { ConnectionGeminiChat } from "../services/gemini.chat.service";
import { Request, Response } from 'express'; 

const conversationHistory = new Map<string, Array<{ role: string; parts: Array<{ text: string }> }>>();
// const conversationHistory = new Map();

export const postResponseChat = async(req: Request, res: Response) => {
    const userMessage = req.body?.message as string | undefined;
    const {user_id} = req;
    if (user_id === undefined) {
        res.status(400).json({ error: "Invalid user ID or reward ID" });
        return
    }
    const userIdStr = user_id.toString(); 

        if (!userMessage) {
            res.status(400).json({ error: 'Message is required' });
            return;
    }
    const userHistory = conversationHistory.get(userIdStr) || [
        {
            role: "user",
            parts: [{ text: "From now on, respond as if you were a girl between 8 and 18 years old. Respond clearly and simply, only on topics appropriate for my age. If I ask about sensitive or difficult topics like sexuality, menstruation, relationships, and self-care, explain them carefully and without inappropriate details. If any question includes insults or offensive words, just tell me that it is not correct and respond kindly and respectfully."}]
        }
    ];
    try{
    const connectionGemini = await ConnectionGeminiChat(userMessage,userHistory)

    const result = await connectionGemini.sendMessage(userMessage);
    const response = await result.response;
    const modelReply = response.text();

     // Almacena la respuesta en el historial
        userHistory.push(
            { role: 'user', parts: [{ text: userMessage }] },
            { role: 'model', parts: [{ text: modelReply }] }
        );
        conversationHistory.set(userIdStr, userHistory);

    res.json({ reply: modelReply });

    } catch(error){
        console.error('Error communicating with Gemini:', error);
        if (error instanceof Error && error.message.includes("SAFETY")) {
            res.status(400).json({
                message:
                    "It seems your question contains a sensitive topic. Could you please rephrase it in a more general or softer way so I can assist you better?",
            });
        } else {
            res.status(500).json({ error: "Error processing the request" });
        }    
    }
    
} 
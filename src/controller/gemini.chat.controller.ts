import { ConnectionGeminiChat } from "../services/gemini.chat.service";
import { Request, Response } from 'express'; 

export const postResponseChat = async(req: Request, res: Response) => {
    const userMessage = req.body?.message as string | undefined;
    
        if (!userMessage) {
            res.status(400).json({ error: 'Message is required' });
            return;
    }
    try{
    const connectionGemini = await ConnectionGeminiChat(userMessage)

    const result = await connectionGemini.sendMessage(userMessage);
    const response = await result.response;
    const modelReply = response.text();

    res.json({ reply: modelReply });
    } catch(error){
        console.error('Error al comunicarse con Gemini:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
    
} 
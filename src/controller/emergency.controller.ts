import { Request, Response } from 'express';
import { getUserEmergencyNumbers } from '../services/emergency.service';


export const getEmergencyNumbersController = async (req: Request, res: Response) => {
    const user_id = req.user_id;
    if (!user_id || isNaN(user_id)) {
        res.status(400).json({ error: 'The user ID is invalid.' });
        return;
    }
    try {
        const emergencyNumbers = await getUserEmergencyNumbers(user_id);
        res.status(200).json({
            data: emergencyNumbers,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message, 
            });
        }
        res.status(500).json({
            error: 'An unexpected error occurred while processing your request.',
        });
    }
};
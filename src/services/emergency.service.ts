import { User } from "../models";
import { generateNumberEmergency } from "./gemini.service";

export const getUserEmergencyNumbers = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const country = user.country;
        if (!country) {
            throw new Error("User's country is not available");
        }

        const emergencyNumbers = await generateNumberEmergency(country);
        return emergencyNumbers;

    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(`Error in obtaining emergency numbers: ${error.message}`);
        }
        throw new Error('Unknown error occurred');
    }
};

import { Assistant } from "../models";
import { IAssistant } from '../interface/index.interface';

export const createAssistant = async(data:IAssistant):Promise<IAssistant> =>{
    if(!data.image){
        throw new Error('Image is required');
    }

    return await Assistant.create(data);
}

export const getAllAssistant = async():Promise<IAssistant[]> =>{
    return await Assistant.findAll();
}
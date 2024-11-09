import { Module } from "../models";
import { IModule } from '../interface/index.interface';


export const saveModuleScore = async (dataModule: IModule): Promise<IModule> => {
    const existingModule = await Module.findOne({where:{name:dataModule.name}});
    if (existingModule) {
        throw new Error(`This name  already has a record in the module "${dataModule.name}".`)
    }
    return await Module.create(dataModule);
}
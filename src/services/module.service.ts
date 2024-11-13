import { Module, Path } from "../models";
import { IModule } from '../interface/index.interface';


export const saveModuleScore = async (dataModule: IModule): Promise<IModule> => {
    const existingModule = await Module.findOne({ where: { name: dataModule.name } });
    if (existingModule) {
        throw new Error(`This name  already has a record in the module "${dataModule.name}".`)
    }
    return await Module.create(dataModule);
}

export const getAllModulesService = async () => {
    const modules = await Module.findAll();
    if (!modules || modules.length === 0) {
        throw new Error('No modules found.');
    }
    return modules;

};

export const getModuleByIdService = async (id:number) =>{
    const module = await Module.findOne({where:{module_id:id}});
    if(!module){
        throw new Error(`Module with ID${id} not found`);
    }
    return module;
}

export const getModulesByPathService = async(pathId:number) =>{
    const path = await Path.findOne({
        where: { path_id: pathId },
        include: [
            {
                model: Module, 
                as: 'Modules',
                attributes: ['module_id', 'name', 'content'] 
            }
        ],
    });
    if(!path){
        throw new Error(`Path with ID${pathId} not found`);
    }
    return path.Modules || [];

}
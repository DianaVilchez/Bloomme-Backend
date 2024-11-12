import { Path } from "../models";


export const createPathService = async(name:string,image:string) =>{

    const existingPath = await Path.findOne({
        where: { name }
    });

    if(existingPath){
        throw new Error(`Path with name ${name} already exists`);
    }

    return await Path.create({name:name,image:image});
}

export const getPathAllService = async() =>{
    return await Path.findAll();
}
import { Request, Response } from "express";
import { getAllModulesService, getModuleByIdService, getModulesByPathService, saveModuleScore } from "../services/module.service";


export const createModule = async (req: Request, res: Response) => {
  try {
    const newModule = await saveModuleScore(req.body);
    res.status(201).json(newModule);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error has occurred' });
    }
  }
}

export const getAllModules = async (req: Request, res: Response) => {
  try {
    const modules = await getAllModulesService();
    res.json({ message: 'Modules fetched successfully.', modules });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching modules.' });
    }
  }
};

export const getModuleByIdController = async (req: Request, res: Response) => {
  const { module_id } = req.params;
  try {
    const module = await getModuleByIdService(Number(module_id));
    res.status(200).json(module);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching modules.' });
    }
  }
};

export const getModulesByPathController = async (req: Request, res: Response) => {
  const { path_id } = req.params;

  try {
    const modules = await getModulesByPathService(Number(path_id));
    res.json({ message: 'Modules fetched successfully.', modules });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });  // Error si el path no se encuentra
    } else {
      res.status(500).json({ message: 'An unexpected error has occurred' });
    }
  }
}
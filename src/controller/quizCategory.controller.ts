import { Request, Response } from "express";
import {
  calculateUserScore,
} from "../services/quizCategory.service";
import { generateQuestionsByType, getAllQuizCategoriesService, saveQuizScore } from "../services/quizCategory.service";

export const createQuizScore = async (req: Request, res: Response) => {
  const { score, name } = req.body;

  try {
    const newScore = await saveQuizScore(score, name);
    res.status(201).json(newScore);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Error al guardar el puntaje." });
    }
  }
};


export const getQuizQuestions = async (req: Request, res: Response) => {
  const { type, type_id } = req.params;
  
  const numericId = parseInt(type_id);
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'El ID proporcionado no es un número válido.' });
        return;
    }
  try {

    await generateQuestionsByType(type, numericId);
    res.json({ mesage: "quiz questions and answers created and saved" });
  } catch (error:unknown) {
    if (error instanceof Error) {
      if (error.message === 'Categoría no encontrada') {
          res.status(404).json({ error: error.message });
      } else if (error.message === 'Módulo no encontrado') {
          res.status(404).json({ error: error.message });
      } else if (error.message === 'Tipo inválido. Debe ser "category" o "module".') {
          res.status(400).json({ error: error.message });
      } else {
          res.status(500).json({ error: error.message });
      }
  } else {
      res.status(500).json({ error: 'Hubo un error al generar el quiz.' });
  }
  }
};

export const getAllQuizCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllQuizCategoriesService();
    res.status(200).json(categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Error al obtener las categorías de quiz.' });
    }
  }
};

export const finishQuiz = async (req: Request, res: Response) => {
  const { userAnswers} = req.body;
  const { type, type_id } = req.params;
  const { user_id } = req;
  const numericId = parseInt(type_id);

  if(!user_id || isNaN(user_id)){
    res.status(400).json({ error: 'El ID del usuario no es válido.' });
        return;
  }
  
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'El ID proporcionado no es un número válido.' });
        return;
    }
  if(!type_id || !userAnswers || !type || userAnswers.length === 0  ) {
      res.status(400).json ({ error: 'Faltan datos para finalizar el quiz.' });
  }

  try {
    const score = await calculateUserScore(type, numericId, userAnswers, user_id);
    

    res.json({ message: "Quiz finalizado", score });
  } catch (error) {
    console.error("Error al calcular el puntaje:", error);
    res.status(500).json({ error: "Hubo un error al calcular el puntaje." });
  }
};

// export const updateQuizScore = async (req: Request, res: Response) => {
//   const { user_id, name, score } = req.body;

//   try {
//     // Asegurar qye ambos datos sean enviados correctamente
//     if (!user_id || !name) {
//       return res
//         .status(400)
//         .json({ error: "Faltan datos: user_id y name son obligatorios." });
//     }

//     // Buscar el quiz score correspondiente para el usuario y la categoría
//     const existingScore = await QuizCategory.findOne({
//       where: { user_id, name: name },
//     });

//     if (!existingScore) {
//       return res
//         .status(404)
//         .json({
//           error: "No se encontró el puntaje para este usuario y categoría.",
//         });
//     }

//     // Actualizar el puntaje
//     existingScore.score = score || existingScore.score;
//     await existingScore.save();

//     res.status(200).json({
//       message: `Puntaje actualizado para el usuario ${user_id} en la categoría ${name}`,
//       score: existingScore,
//     });
//   } catch (error) {
//     console.error("Error al actualizar el puntaje:", error);
//     res.status(500).json({ error: "Error al actualizar el puntaje." });
//   }
// };

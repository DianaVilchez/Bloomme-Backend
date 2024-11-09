import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { DecodedToken } from '../interface/index.interface';


export const isAuthenticated = (req: Request, resp: Response, next: NextFunction): void => {
    try {
        const secretKey = process.env.JWT_SECRET || "secreto";
        // console.log("🚀 ~ Clave secreta:", secretKey);
        const { authorization } = req.headers;
        if (!authorization) {
            resp.status(401).json({ message: "Authorization header is missing" });
            return;
        }

        const [type, token] = authorization.split(" ");
        // console.log("🚀 ~ Tipo de token:", type);
        // console.log("🚀 ~ Token recibido:", token);
        // console.log("🚀 ~ authMiddleware ~ token:", token)

        if (type.toLowerCase() !== "bearer" || !token) {
            resp.status(401).json({ message: "Invalid authorization format" });
            return;
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            
            if (err) {
                resp.status(401).json({ message: "error del token" });
                return;
            }

            const decodedToken = decoded as DecodedToken;

             // Usar un "type assertion" para extender req temporalmente
             (req as Request & { user_id: number; username: string }).user_id = decodedToken.user_id;
             (req as Request & { user_id: number; username: string }).username = decodedToken.username;
 
            // console.log("🚀 ~ jwt.verify ~ decodedToken:", decodedToken)
            
            next();
        });

    } catch (error) {
        resp.status(400).json({ message: "Error de token" });
    }
}
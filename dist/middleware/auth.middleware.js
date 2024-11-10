"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, resp, next) => {
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
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                resp.status(401).json({ message: "error del token" });
                return;
            }
            const decodedToken = decoded;
            // Usar un "type assertion" para extender req temporalmente
            req.user_id = decodedToken.user_id;
            req.username = decodedToken.username;
            // console.log("🚀 ~ jwt.verify ~ decodedToken:", decodedToken)
            next();
        });
    }
    catch (error) {
        resp.status(400).json({ message: "Error de token" });
    }
};
exports.isAuthenticated = isAuthenticated;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_controller_1 = require("../controller/path.controller");
// import { isAuthenticated } from '../middleware/auth.middleware';
const pathRouter = express_1.default.Router();
exports.pathRouter = pathRouter;
pathRouter.post('/path', path_controller_1.postPathController);
pathRouter.get('/path', path_controller_1.getAllPathController);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const gemini_chat_controller_1 = require("../controller/gemini.chat.controller");
const chatRouter = express_1.default.Router();
exports.chatRouter = chatRouter;
chatRouter.post('/chat/:user_id', gemini_chat_controller_1.postResponseChat);

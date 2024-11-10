"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const express_1 = __importDefault(require("express"));
const module_controller_1 = require("../controller/module.controller");
const moduleRouter = express_1.default.Router();
exports.moduleRouter = moduleRouter;
moduleRouter.post('/module', module_controller_1.createModule);

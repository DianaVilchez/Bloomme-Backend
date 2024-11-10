"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPathController = exports.postPathController = void 0;
const path_service_1 = require("../services/path.service");
const postPathController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newPath = yield (0, path_service_1.createPathService)(name);
        res.status(201).json(newPath);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
});
exports.postPathController = postPathController;
const getAllPathController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pathAll = yield (0, path_service_1.getPathAllService)();
        res.status(200).json(pathAll);
    }
    catch (error) {
        res.status(500).json({ message: 'An unexpected error has occurred' });
    }
});
exports.getAllPathController = getAllPathController;

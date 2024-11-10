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
exports.updateUserController = exports.getAllUser = void 0;
const user_service_1 = require("../services/user.service");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAll = yield (0, user_service_1.allUserService)();
        res.status(200).json(userAll);
    }
    catch (error) {
        res.status(500).json({ message: 'An unexpected error has occurred' });
    }
});
exports.getAllUser = getAllUser;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const id = Number(user_id);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }
    const userData = req.body;
    try {
        const updatedUser = yield (0, user_service_1.updateUserService)(id, userData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
});
exports.updateUserController = updateUserController;

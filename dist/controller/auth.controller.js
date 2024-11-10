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
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, auth_service_1.registerUser)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error has occurred' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }
    try {
        const { user, tokenUser } = yield (0, auth_service_1.authenticateUser)(username, email, password);
        res.status(200).json({ message: 'Successful login', user, tokenUser });
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
exports.login = login;

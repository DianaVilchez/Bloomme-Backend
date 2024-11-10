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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield models_1.User.findOne({
        where: {
            username: userData.username
        }
    });
    if (existingUser) {
        throw new Error('The user name is already in use');
    }
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
    const newUser = yield models_1.User.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, total_point: 0 }));
    return newUser;
});
exports.registerUser = registerUser;
const authenticateUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({
        where: {
            [sequelize_1.Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }
    const tokenUser = jsonwebtoken_1.default.sign({ user_id: user.user_id, username: user.username }, JWT_SECRET);
    return { user, tokenUser };
});
exports.authenticateUser = authenticateUser;

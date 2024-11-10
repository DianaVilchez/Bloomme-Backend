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
exports.updateUserService = exports.allUserService = void 0;
const models_1 = require("../models");
const allUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield models_1.User.findAll();
    return allUser;
});
exports.allUserService = allUserService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(id);
    if (!user) {
        throw new Error('the user does not exist yet');
    }
    const updatedUser = yield user.update(data);
    return updatedUser;
});
exports.updateUserService = updateUserService;

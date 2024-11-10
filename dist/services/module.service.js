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
exports.saveModuleScore = void 0;
const models_1 = require("../models");
const saveModuleScore = (dataModule) => __awaiter(void 0, void 0, void 0, function* () {
    const existingModule = yield models_1.Module.findOne({ where: { name: dataModule.name } });
    if (existingModule) {
        throw new Error(`This name  already has a record in the module "${dataModule.name}".`);
    }
    return yield models_1.Module.create(dataModule);
});
exports.saveModuleScore = saveModuleScore;

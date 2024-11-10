"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Path_1 = require("./Path");
class Module extends sequelize_1.Model {
}
exports.Module = Module;
Module.init({
    module_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    point: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    path_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Path_1.Path,
            key: 'path_id'
        }
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Module",
    tableName: "module",
    timestamps: true,
});

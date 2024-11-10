"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Path extends sequelize_1.Model {
}
exports.Path = Path;
Path.init({
    path_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Path",
    tableName: "path",
    timestamps: true,
});

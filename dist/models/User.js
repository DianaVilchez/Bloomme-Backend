"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    total_point: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    assistant_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    assistant_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: true,
});
/*
Table user {
    user_id integer [primary key]
    username varchar
    email varchar
    age varchar
    country varchar
    password varchar
    reward_id fk
    assistant_id fk
    created_at timestamp
    total_point integer
  }
  */ 

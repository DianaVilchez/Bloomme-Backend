import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Module } from './Module';

interface PathAttributes {
    path_id: number;
    name: string;
    image:string;  
}

interface PathCreationAttributes extends Optional<PathAttributes, 'path_id' > {}

class Path extends Model<PathAttributes, PathCreationAttributes> implements PathAttributes {
    public path_id!: number;
    public name!: string;
    public image!:string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly Modules?: Module[];
}

Path.init(
    {
        path_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Path",
        tableName: "path",
        timestamps: true, 
    }
);

export {Path};

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Path } from './Path';

interface ModuleAttributes {
    module_id: number;
    name: string;
    image: string;
    content: string;
    point: number;
    path_id:number;
}

interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'module_id'> { }

class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
    public module_id!: number;
    public name!: string;
    public image!: string;
    public content!: string;
    public point!: number;
    public path_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Module.init({
    module_id: {
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
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    point: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    path_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Path,
            key: 'path_id'
        }
    }

},
    {
        sequelize,
        modelName: "Module",
        tableName: "module",
        timestamps: true,
    }
)

export { Module };


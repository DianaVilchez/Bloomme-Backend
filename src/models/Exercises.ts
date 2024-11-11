import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { Emotion } from "./Emotion";

interface ExercisesAttributes {
    exercises_id: number;
    name: string; 
    emotion_id: number; 
}

interface ExercisesCreationAttributes extends Optional<ExercisesAttributes, 'exercises_id' > {}

class Exercises extends Model<ExercisesAttributes, ExercisesCreationAttributes> implements ExercisesAttributes {
    public exercises_id!: number;
    public name!: string;
    public emotion_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Exercises.init(
    {
        exercises_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emotion_id: {
            type: DataTypes.INTEGER,
            references:{
                model: Emotion,
                key: 'emotion_id'
            }
        },
    },
    
    {
        sequelize,
        modelName: "Exercises",
        tableName: "exercises",
        timestamps: true, 
    }
);

export {Exercises};
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface EmotionAttributes {
    emotion_id: number;
    name: string;  
}

interface EmotionCreationAttributes extends Optional<EmotionAttributes, 'emotion_id' > {}

class Emotion extends Model<EmotionAttributes, EmotionCreationAttributes> implements EmotionAttributes {
    public emotion_id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Emotion.init(
    {
        emotion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Emotion",
        tableName: "emotion",
        timestamps: true, 
    }
);

export {Emotion};

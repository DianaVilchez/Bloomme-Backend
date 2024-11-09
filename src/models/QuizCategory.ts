import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';

interface QuizCategoryAttributes {
    quiz_id: number;
    score: number;
    name: string;
}

interface QuizCategoryCreationAttributes extends Optional<QuizCategoryAttributes, 'quiz_id'> { }

class QuizCategory extends Model<QuizCategoryAttributes, QuizCategoryCreationAttributes> implements QuizCategoryAttributes {
    public quiz_id!: number;
    public score!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

QuizCategory.init({
    quiz_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}
    , {
        sequelize,
        modelName: "QuizCategory",
        tableName: "quiz_category",
        timestamps: true,
    }
);

export { QuizCategory }
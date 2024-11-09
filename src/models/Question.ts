import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { QuizCategory } from './QuizCategory';
import { Option } from './Option';

interface QuestionAttributes {
    question_id: number;
    question_text: string;
    type:string;
    type_id:number;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'question_id'> { }


class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
    public question_id!: number;
    public question_text!: string;
    public type!:string;
    public type_id!:number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public Options!: Option[];

    static associate(models: any) {
        Question.hasMany(models.Option, { foreignKey: 'question_id', as: 'Options' });
    }
}

Question.init({
    question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {
    sequelize, modelName: 'Question', tableName: "question",
    timestamps: true,
});


export { Question }
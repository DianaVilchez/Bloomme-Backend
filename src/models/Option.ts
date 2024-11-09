import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Question } from './Question';

interface OptionAttributes {
    option_id: number;
    option_text: string;
    question_id: number;
    is_correct:boolean;
}

interface OptionCreationAttributes extends Optional<OptionAttributes, 'option_id'> { }


class Option extends Model<OptionAttributes, OptionCreationAttributes> implements OptionAttributes {
    public option_id!: number;
    public option_text!: string;
    public question_id!: number;
    public is_correct!:boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Option.init({
    option_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Question,
            key: 'question_id'
        }
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize, modelName: 'Option', tableName: "option",
    timestamps: true,
});


export { Option  }
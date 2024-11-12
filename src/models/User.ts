import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Assistant } from './Assistant';


interface UserAttributes {
    user_id: number;
    username: string;
    email: string;
    age: number;
    country: string;
    password: string;
    total_point?: number;
    assistant_name: string;
    assistant_id: number;
    current_avatar?: string;
    current_background?: string;
    quiz_completed?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'total_point' | 'current_avatar' | 'current_background' | 'quiz_completed'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public age!: number;
    public country!: string;
    public password!: string;
    public total_point?: number;
    public assistant_name!: string;
    public assistant_id!: number;
    public current_avatar!: string;
    public current_background!: string;
    public quiz_completed!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_point: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    assistant_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assistant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Assistant,
            key: 'assistant_id'
        }
    },
    current_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    current_background: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quiz_completed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

},
    {
        sequelize,
        modelName: "User",
        tableName: "user",
        timestamps: true,
    }
)

export { User };


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
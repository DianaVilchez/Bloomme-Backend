import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';


interface UserAttributes {
    user_id: number;
    username: string;
    email: string;
    age: number;
    country: string;
    password: string;
    total_point?: number;
    assistant_name: string;
    assistant_image: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'total_point'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public age!: number;
    public country!: string;
    public password!: string;
    public total_point?: number;
    public assistant_name!: string;
    public assistant_image!: string;

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
    assistant_image: {
        type: DataTypes.STRING,
        allowNull: false
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
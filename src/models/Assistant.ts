import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";


interface AssistantAttributes {
  assistant_id: number;
  image?: string; 
}

interface AssistantCreationAttributes
  extends Optional<AssistantAttributes, "assistant_id"> {}

class Assistant
  extends Model<AssistantAttributes, AssistantCreationAttributes>
  implements AssistantAttributes
{
  public assistant_id!: number;
  public image?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assistant.init(
  {
    assistant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Assistant",
    tableName: "assistant",
    timestamps: true,
  }
);

export { Assistant };
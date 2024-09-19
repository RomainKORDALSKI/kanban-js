import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

export class Card extends Model {}

Card.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  color: {
    type: DataTypes.STRING(7),
  },
}, {
  sequelize,
  tableName: "card",
});
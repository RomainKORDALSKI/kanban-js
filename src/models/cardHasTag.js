/*
Ce modéle est celui de notre table d'association.

Sequelize peut le créer automatiquement.

J'ai choisis de le faire moi-même pour : 
  - avoir un modéle et un nom de table différents (le modèle CardHasTag lié à la table card_has_tag)
  - mettre en place une contrainte d'unicité sur la paire de valeurs contenu dans les colonnes card_id et tag_id
*/

import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";
import { Card } from "./card.js";
import { Tag } from "./tag.js";

export class CardHasTag extends Model {}

CardHasTag.init({
  cardId: {
    type: DataTypes.INTEGER,
    references: {
      model: Card,
      key: "id",
    },
  },
  tagId:  {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: "id",
    },
  },
}, {
  sequelize,
  tableName: "card_has_tag",
  indexes: [
    {
      unique: true,
      fields: ["card_id", "tag_id"],
    }
  ],
});
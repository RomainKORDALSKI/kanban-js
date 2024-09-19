// Importer nos modèles
import { Card } from "./card.js";
import { List } from "./list.js";
import { Tag } from "./tag.js";
import { CardHasTag } from "./cardHasTag.js";
import { sequelize } from "./sequelize.js";

// List <--> Card (One-to-Many)
List.hasMany(Card, {
  as: "cards", // alias de l'association
  foreignKey: {
    name: "listId", // du côté de la DB, la colonne s'appellera list_id à cause de l'option underscored passée à la création de sequelize 
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Card.belongsTo(List, {
  as: "list",
  foreignKey: "listId",
});

// Card <--> Tag (Many-to-Many)
Card.belongsToMany(Tag, {
  as: "tags",
  through: CardHasTag,
});

Tag.belongsToMany(Card, {
  as: "cards",
  through: CardHasTag,
});

// Exporter nos modèles
export { Card, List, Tag, sequelize };

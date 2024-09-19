import "dotenv/config";

import { Card, List, Tag, sequelize } from "../models/index.js";

// ===========================================
// === seeding (avec bulkCreate + include) ===
// ===========================================

seedDatabase();

async function seedDatabase() {
  console.log("🔄 seeding started...");

  // Create Tags
  const urgentTag = await Tag.create({ name: "Urgent",       color: "#FF00FF" });
  const discussTag = await Tag.create({ name: "À discuter", color: "#00FF00" });
  const cancelTag = await Tag.create({ name: "Annulé",    color: "#000000" });

  const tags = [ urgentTag, discussTag, cancelTag ];

  const lists = [
    { title: "Backlog", position: 1, cards: [
      { title: "Sequelize", content: "Créer les modéles", position: 3, color: "#FF0000" },
      { title: "Endpoints", content: "Créer les routeurs",  position: 2, color: "#00FF00" },
      { title:"Scaffolding", content: "Mettre en place NPM et eslint", position: 1, color: "#FF00FF" }
    ] },

    { title: "ToDo", position: 2, cards: [
      { title:"Conception BDD", content: "Créer MCD, MLD et MPD", position: 1, color: "#FF00FF" },
      { title:"Courses", content: "Il n'y a plus de café", position: 1, color: "#FF00FF" },
      { title:"Code", content: "Correction de bug", position: 2, color: "#00FF00" },
      { title:"Apprentissage", content: "Apprendre le langage Go", position: 4, color: "#FF0000" }
    ] },
    
    { title: "Done", position: 3, cards: [
      { title:"Réunion", content: "Discussion avec le client", position: 3, color: "#0000FF" },
      { title:"Wireframes", content: "wireframes et prototypage", position: 1, color: "#FF00FF" },
      { title:"User Stories", content: "Décrire les fonctionnalités attendues", position: 1, color: "#FF00FF" }
    ] }

  ];

  // Create List and Cards (in one batch !)
  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
  await List.bulkCreate(lists, { include: "cards" });

  // Add Tags to some Cards
  for (const list of lists) {
    for (const listCard of list.cards) {
      const card = await Card.findOne({ where: { title: listCard.title }});
      for (const tag of tags) {
        if (Math.random() > 0.4) await card.addTag(tag);
      }
    }
  }

  console.log("✅ Done ! Closing DB connection...");
  await sequelize.close();
}

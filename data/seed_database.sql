BEGIN;

INSERT INTO "list" ("id", "title", "position") VALUES
  (1, 'Backlog', 1),
  (2, 'ToDo', 2),
  (3, 'Done', 3);

INSERT INTO "card" ("id", "title", "content", "position", "color", "list_id") VALUES
  (1, 'mise en place des models', 'creer les modèles pour Sequelize', 1, '#FF0000', 1),
  (2, 'mise en place des routeurs', 'creer les routeurs pour les opérations de CRUD', 2, '#FF0000', 1),
  (3, 'Initilisation du projet', 'mise en place de npm et d''eslint', 1, '#FF0000', 2),
  (4, 'Création du dépôt', 'Créer un dépôt sur GH pour héberger le projet', 2, '#FF0000', 2),
  (5, 'Conception de la DB', 'MCD, MLD, MPD', 1, '#00FF00', 3),
  (6, 'Définition des user stories', 'Décrire les fonctionnalités attendues par l''utilisateur', 2, '#0000FF', 3);

INSERT INTO "tag" ("id", "name", "color") VALUES
  (1, 'Urgent', '#FF0000'),
  (2, 'À discuter', '#00FF00'),
  (3, 'Abandonné', '#0000FF');

INSERT INTO "card_has_tag" ("card_id", "tag_id") VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 1),
  (3, 2),
  (4, 2),
  (5, 3),
  (6, 3);

SELECT setval('list_id_seq', (SELECT MAX("id") FROM "list")); -- indique à la db de générer les nouveau id en partant de la plus grande valeur déjà existante
SELECT setval('card_id_seq', (SELECT MAX("id") FROM "card"));
SELECT setval('tag_id_seq', (SELECT MAX("id") FROM "tag"));

COMMIT;
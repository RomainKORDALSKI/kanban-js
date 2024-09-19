import { Card, Tag } from "../models/index.js";
import { HTTPError } from "../errors/httpError.js";

// renvoie toutes les cartes
export const getAll = async (_, res) => {
  const cards = await Card.findAll({
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  return res.json(cards);
};

// renvoie une carte
export const getOne = async (req, res) => {
  const card = await Card.findByPk(req.params.id,{
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  if(!card){
    throw new HTTPError(404, "Card not found. Please verify the provided ID.");
  }
  return res.json(card);
};

// crée une carte
export const createOne = async (req, res) =>{
  const card = await Card.create(req.body);
  return res.status(201).json(card);
};

// modifie une carte
export const modifyOne = async (req, res) => {
  const card = await Card.findByPk(req.params.id, {
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });

  if(!card){
    throw new HTTPError(404, "Card not found. Please verify the provided ID.");
  }

  await card.update(req.body);
  return res.json(card);
};

// efface une carte
export const deleteOne = async (req, res) => {
  const card = await Card.findByPk(req.params.id);
  if(!card){
    throw new HTTPError(404, "Card not found. Please verify the provided ID.");
  }
  await card.destroy();
  return res.status(204).end();
};

// associe une carte avec un tag
export const associateOneWithTag = async(req, res) => {
  const card = await Card.findByPk(req.params.cardId,{
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  const tag = await Tag.findByPk(req.params.tagId);
  if(!card || !tag){
    throw new HTTPError(404, "Card or tag not found. Please verify the provided IDs.");
  }
  await card.addTag(tag);
  const updatedCard = await Card.findByPk(req.params.cardId,{
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  res.status(201).json(updatedCard);
};

// dissocie une carte d'un tag
export const dissociateOneFromTag = async(req, res) => {
  const card = await Card.findByPk(req.params.cardId,{
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  const tag = await Tag.findByPk(req.params.tagId);
  if(!card || !tag){
    throw new HTTPError(404, "Card or tag not found. Please verify the provided IDs.");
  }
  await card.removeTag(tag);
  const updatedCard = await Card.findByPk(req.params.cardId,{
    include: {
      association: "tags",
      through: { attributes: [] },
    },
  });
  res.status(201).json(updatedCard);
};


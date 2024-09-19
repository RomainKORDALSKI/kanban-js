import { Tag } from "../models/index.js";
import { HTTPError } from "../errors/httpError.js";

// renvoie tous les tags
export const getAll = async (_, res) => {
  const tags = await Tag.findAll();
  return res.json(tags);
};

// renvoie un tag
export const getOne = async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if(!tag){
    throw new HTTPError(404, "Tag not found. Please verify the provided ID.");
  }
  return res.json(tag);
};

//crée un tag
export const createOne = async (req, res) =>{
  const tag = await Tag.create(req.body);
  return res.status(201).json(tag);
};

// modifie un tag
export const modifyOne = async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if(!tag){
    throw new HTTPError(404, "Tag not found. Please verify the provided ID.");
  }
  await tag.update(req.body);
  return res.json(tag);
};

// efface un tag
export const deleteOne = async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  if(!tag){
    throw new HTTPError(404, "Tag not found. Please verify the provided ID.");
  }
  await tag.destroy();
  return res.status(204).end();
};

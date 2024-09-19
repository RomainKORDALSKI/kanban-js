import { List } from "../models/index.js";
import { HTTPError } from "../errors/httpError.js";

// renvoie toutes les listes
export const getAll = async (_, res) => {
  const lists = await List.findAll({
    include: {
      association: "cards",
      include: {
        association: "tags",
        through: { attributes: [] },
      },
    },
    order:[["position","ASC"],["cards","position","ASC"]],
  });
  return res.json(lists);
};

// Retrieve a list by its ID
export const getOne = async (req, res) => {
  const listId = req.params.id;
  const list = await List.findByPk(listId, {
    include: {
      association: "cards",
      include: {
        association: "tags",
        through: { attributes: [] },
      },
    },
    order:[["cards","position","ASC"]],
  });

  if (!list) {
    throw new HTTPError(404, "List not found. Please verify the provided ID.");
  }

  return res.json(list);
};

// crée une liste
export const createOne = async (req, res) =>{
  const list = await List.create(req.body);
  return res.status(201).json(list);
};

// modifie une liste
export const modifyOne = async (req, res) => {
  const list = await List.findByPk(req.params.id, {
    include: {
      association: "cards",
      include: {
        association: "tags",
        through: { attributes: [] },
      },    
    },
  });
  if(!list){
    throw new HTTPError(404, "List not found. Please verify the provided ID.");
  }
  await list.update(req.body);
  return res.json(list);
};

// efface une liste
export const deleteOne = async (req, res) => {
  const list = await List.findByPk(req.params.id);
  if(!list){
    throw new HTTPError(404, "List not found. Please verify the provided ID.");
  }
  await list.destroy();
  return res.status(204).end();
};

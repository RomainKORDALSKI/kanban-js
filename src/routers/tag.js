import { Router } from "express";
import { controllerWrapper } from "../controllers/controllerWrapper.js"; 
import { getAll, createOne, getOne, modifyOne, deleteOne } from "../controllers/tagController.js";
import { createTagSchema, idSchema, modifyTagSchema, createValidationMiddleWare } from "../validation/schemas.js";

export const router = Router();

// route pour récupérer tous les tags
router.get("/", controllerWrapper(getAll));

// route pour récupérer un tag
router.get(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(getOne)
);

// route pour créer un tag
router.post("/", 
  createValidationMiddleWare(createTagSchema, "body"),
  controllerWrapper(createOne)
);

// route pour modifier un tag
router.patch(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  createValidationMiddleWare(modifyTagSchema, "body"),
  controllerWrapper(modifyOne)
);

// route pour effacer un tag
router.delete(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(deleteOne)
);


import { Router } from "express";
import { controllerWrapper } from "../controllers/controllerWrapper.js"; 
import { getAll, createOne, getOne, modifyOne, deleteOne } from "../controllers/listController.js";
import { createListSchema, idSchema, modifyListSchema, createValidationMiddleWare } from "../validation/schemas.js";

export const router = Router();

// route pour récupérer toutes les listes
router.get("/", controllerWrapper(getAll));

// route pour récupérer une liste
router.get(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(getOne)
);

// route pour créer une liste
router.post("/", 
  createValidationMiddleWare(createListSchema, "body"),
  controllerWrapper(createOne)
);

// route pour modifier une liste
router.patch(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  createValidationMiddleWare(modifyListSchema, "body"),
  controllerWrapper(modifyOne)
);

// route pour effacer une liste
router.delete(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(deleteOne)
);


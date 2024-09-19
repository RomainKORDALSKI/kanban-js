import { Router } from "express";
import { controllerWrapper } from "../controllers/controllerWrapper.js"; 
import { 
  getAll, 
  createOne, 
  getOne, 
  modifyOne, 
  deleteOne, 
  associateOneWithTag, 
  dissociateOneFromTag
} from "../controllers/cardController.js";
import {
  createCardSchema, 
  modifyCardSchema, 
  idSchema, 
  cardAndTagSchema, 
  createValidationMiddleWare 
} from "../validation/schemas.js";

export const router = Router();

// route pour récupérer toutes les cartes
router.get("/", controllerWrapper(getAll));

// route pour récupérer une carte
router.get(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(getOne)
);

// route pour récupérer créer une carte
router.post("/", 
  createValidationMiddleWare(createCardSchema, "body"),
  controllerWrapper(createOne)
);

// route pour modifier une carte
router.patch(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  createValidationMiddleWare(modifyCardSchema, "body"),
  controllerWrapper(modifyOne)
);

// route pour effacer une carte
router.delete(
  "/:id",
  createValidationMiddleWare(idSchema, "params"),
  controllerWrapper(deleteOne)
);

// route pour associer une carte et un tag
router.put(
  "/:cardId/tags/:tagId",
  createValidationMiddleWare(cardAndTagSchema, "params"),
  controllerWrapper(associateOneWithTag)
);

// route pour dissocier une carte et un tag
router.delete(
  "/:cardId/tags/:tagId",
  createValidationMiddleWare(cardAndTagSchema, "params"),
  controllerWrapper(dissociateOneFromTag)
);


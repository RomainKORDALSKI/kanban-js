import { Router } from "express";
import { router as listRouter } from "./list.js";
import { router as cardRouter } from "./card.js";
import { router as tagRouter } from "./tag.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { notFound } from "../middlewares/notFound.js";

export const router = Router();

// mise en place des 3 sous routeurs qu'on branche sur les routes voulues
router.use("/lists", listRouter);
router.use("/cards", cardRouter);
router.use("/tags", tagRouter);

// mise en place de MW de gestion des 404
router.use(notFound);

// mise en place du middleware de gestion des erreurs
router.use(errorHandler);
import joi from "joi"; // https://joi.dev/api/
import { HTTPError } from "../errors/httpError.js";

/********************************************************
 * Schémas de validation pour les paramètres des routes *
 ********************************************************/

export const idSchema = joi.object({
  id: joi.number().integer().required(),
});

export const cardAndTagSchema = joi.object({
  cardId: joi.number().integer().required(),
  tagId: joi.number().integer().required(),
});

// Schémas de validation pour les listes

export const createListSchema = joi.object({
  title: joi.string().min(3).required(),
  position: joi.number().integer(),
});

export const modifyListSchema = joi.object({
  title: joi.string().min(3),
  position: joi.number().integer(),
}).min(1);

// Schémas de validation pour les cartes

export const createCardSchema = joi.object({
  title: joi.string().min(3).required(),
  content: joi.string().min(10).required(),
  listId: joi.number().integer().required(),
  color: joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  position: joi.number().integer(),
});

export const modifyCardSchema = joi.object({
  title: joi.string().min(3),
  content: joi.string().min(10),
  listId: joi.number().integer(),
  color: joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  position: joi.number().integer(),
}).min(1);

// Schémas de validation pour les tags

export const createTagSchema = joi.object({
  name: joi.string().min(3).required(),
  color: joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});

export const modifyTagSchema = joi.object({
  name: joi.string().min(3),
  color: joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
}).min(1);

/**
 * Creates a middleware function that validates the request data against the provided schema.
 *
 * @param {Object} schema - The Joi schema used for validation.
 * @param {string} requestProperty - The property of the request object to validate.
 * @return {Function} The middleware function that validates the request data.
 */
export const createValidationMiddleWare = (schema, requestProperty) => {
  return (request, _, next) => {
    const { error } = schema.validate(request[requestProperty]);

    if (!error) {
      return next();
    }
    const errorMessage = error.details[0].message;
    const httpError = new HTTPError(400, errorMessage);
    return next(httpError);
  };
};

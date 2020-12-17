import Joi from "joi";

//-------------------- DATE --------------------//

export const dateSchema = Joi.object({
  day: Joi.number().required().integer().min(1).max(31),
  month: Joi.number().required().integer().min(1).max(12),
  year: Joi.string()
    .required()
    .length(4)
    .regex(/^[12]\d+$/),
});

//-------------------- ADDRESS --------------------//

export const addressSchema = Joi.object({
  street: Joi.string().required().trim().max(100),
  complement: Joi.string().trim().empty("").max(100),
  city: Joi.string().required().trim().max(64),
  zipCode: Joi.string().required().trim().uppercase().max(10),
  country: Joi.string().trim().empty("").lowercase().max(64).default("france"),
});

export const patchAddressSchema = Joi.object({
  street: Joi.string().trim().empty("").max(100),
  complement: Joi.string().trim().empty("").max(100),
  city: Joi.string().trim().empty("").max(64),
  zipCode: Joi.string().trim().empty("").uppercase().max(10),
  country: Joi.string().trim().empty("").lowercase().max(64).default("france"),
});

import Joi from "joi";
import { addressSchema, patchAddressSchema } from "./commons";

export const registerSchema = Joi.object({
  email: Joi.string().required().trim().email().max(254), // According to spec from IETF RFC Errata in 2010
  password: Joi.string().required().max(50), // bcrypt limitation
  lastName: Joi.string().required().trim().max(64),
  firstName: Joi.string().required().trim().max(64),
  address: addressSchema,
});

export const loginSchema = Joi.object({
  email: Joi.string().required().trim().email().max(254), // According to spec from IETF RFC Errata in 2010
  password: Joi.string().required().max(50), // bcrypt limitation
});

export const patchParentSchema = Joi.object({
  email: Joi.string().trim().empty("").email().max(254), // According to spec from IETF RFC Errata in 2010
  password: Joi.string().empty("").max(50), // bcrypt limitation
  lastName: Joi.string().trim().empty("").max(64),
  firstName: Joi.string().trim().empty("").max(64),
  address: patchAddressSchema,
});

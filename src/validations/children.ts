import Joi from "joi";
import { dateSchema } from "./commons";

export const childrenSchema = Joi.object({
  lastName: Joi.string().required().trim().max(64),
  firstName: Joi.string().required().trim().max(64),
  birthDate: dateSchema,
  note: Joi.string().trim().empty("").max(1024),
});

import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import ErrorTypes from "../utils/ErrorTypes";

const requestValidation = (validationSchema: Joi.ObjectSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validationSchema.validate(req.body);
  if (error) {
    console.log("Joi Error", req.route, error); // TODO-MV : Delete console.log() at some point
    return res.status(400).send(ErrorTypes.BAD_REQUEST);
  }
  req.body = value;
  next();
};

export default requestValidation;

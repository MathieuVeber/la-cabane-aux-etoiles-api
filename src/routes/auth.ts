import Router from "express";
import { Request, Response, NextFunction } from "express";
import ErrorTypes from "../utils/ErrorTypes";
import { IParent, Parent } from "../models/parents";
import passport from "passport";
import jwt from "jsonwebtoken";
import JWToken from "../utils/JWToken";

// TODO-MV :
// - Comment this file
// - Implement the new architecture of authentification
// - Write validation

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, address } = req.body;
  let parent: IParent | null;
  try {
    parent = await Parent.findOne({ email: email });
  } catch (err) {
    return res.status(500).send(ErrorTypes.SERVER_ERROR);
  }
  if (parent) {
    return res.status(400).send(ErrorTypes.EMAIL_ALREADY_TAKEN);
  }

  const newParent = new Parent({
    email,
    firstName,
    lastName,
    address,
  });
  await newParent.setPassword(password);
  try {
    newParent.save();
  } catch (err) {
    return res.status(500).send(ErrorTypes.SERVER_ERROR);
  }

  req.logIn(newParent, (err) => {
    // Assigning a token
    const token = jwt.sign(
      {
        _id: newParent.id,
      },
      process.env.TOKEN_SECRET || "secret"
    );

    res.header("Set-Cookie", token).status(200).json({
      parent: newParent.getSafeParent(),
    });
  });
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, parent: IParent) => {
      if (err) {
        return res.status(500).send(ErrorTypes.SERVER_ERROR);
      }
      if (!parent) {
        return res.status(401).send(ErrorTypes.TOKEN_ERROR);
      }

      req.logIn(parent, (err) => {
        // Assigning a token
        const unsignedToken: JWToken = {
          _id: parent.id,
        };
        const token = jwt.sign(
          unsignedToken,
          process.env.TOKEN_SECRET || "secret"
        );

        res.header("Set-Cookie", `jwt=${token}`).status(200).json({
          parent: parent.getSafeParent(),
        });
      });
    })(req, res, next);
  }
);

export default router;

import { NextFunction, Request, Response } from "express";
import Router from "express";
import { IParent, Parent } from "../models/parents";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  let parent: IParent | null;
  try {
    parent = await Parent.findOne({ email: email });
  } catch (err) {
    return res.status(500).send("Error while registering");
  }
  if (parent) {
    return res.status(400).send("Parent already exists");
  }

  const newParent = new Parent({
    email,
    firstName,
    lastName,
  });
  await newParent.setPassword(password);
  try {
    newParent.save();
  } catch (err) {
    return res.status(500).send("Error while registering");
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
export default router;

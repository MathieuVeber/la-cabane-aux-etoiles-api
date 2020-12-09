import { NextFunction, Request, Response } from 'express';
import Router from 'express';
import { IParent } from '../models/parents';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import JWToken from '../utils/JWToken';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, parent: IParent) => {
    if(err) { return res.status(500).send('Error while connecting') }
    if(!parent) { return res.status(401).send('Not Authorized') }

    req.logIn(parent, err => {
      // Assigning a token
      const unsignedToken : JWToken = {
        _id: parent.id
      }
      const token = jwt.sign(unsignedToken, process.env.TOKEN_SECRET || 'secret');

      res.header('Set-Cookie', `jwt=${token}`)
        .status(200)
        .json({
          parent: parent.getSafeParent()
        });
    })
  })(req, res, next);

});
export default router;

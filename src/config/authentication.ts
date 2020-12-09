import passport from 'passport';
import { Strategy } from 'passport-local';
import { Parent } from '../models/parents';
import { Request } from 'express';
import JWToken from '../utils/JWToken';

passport.use(new Strategy(
  {
    usernameField: 'email'
  },
  function(email, password, done) {
    Parent.findOne(
      { email: email },
      function (err, parent) {
        if (err) { return done(err); }
        if (!parent) { return done(null, false); }
        if (!parent.validatePassword(password)) { return done(null, false); }

        return done(null, parent);
      }
    );
  }
));

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// TODO-MV
// - Move function
// - Error format
// - Expiration Token (refresh ?)
const extractCookieFromRequest = (cookieName: string) => (req: Request) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[cookieName];
    }
    return token;
};
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.TOKEN_SECRET || 'secret',
      jwtFromRequest: ExtractJWT.fromExtractors([extractCookieFromRequest('jwt')]),
    },
    async (token: JWToken, done: any) => {
      try {
        const parent = await Parent.findById(token._id);
        if(!parent) { return done(null, false) };
        return done(null, parent);
      } catch (error) {
        done(error);
      }
    }
  )
);

export const authenticationInitialize = () => passport.initialize();

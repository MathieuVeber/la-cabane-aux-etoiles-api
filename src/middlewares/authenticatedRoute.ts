import passport from "passport";

/*
  Description :
    Allow parents to access routes that are not public.

  Success :
    Valid connection token && connected Parent in req.user

  Error :
    (401) Invalid connection token or missing token

  Usages :
    Can be combined with one of the RestrictedRoute middlewares.
*/

const authenticatedRoute = passport.authenticate("jwt", { session: false });

// TODO-MV :
// - Callback function to handle the response(ERROR_TYPES)
// - Token + Refresh Token brand new implementation
//
// TODO-TF :
// - Configure user type as parent in req.user (Express)

export default authenticatedRoute;

enum ErrorTypes {
  // 400
  EMAIL_ALREADY_TAKEN = "EMAIL_ALREADY_TAKEN",
  // 401
  TOKEN_ERROR = "TOKEN_ERROR", // TODO-MV : will be replaced and clarified
  // 403
  ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
  // 404
  PARENT_NOT_FOUND = "PARENT_NOT_FOUND",
  // 500
  SERVER_ERROR = "SERVER_ERROR",
}

export default ErrorTypes;
import statusCodes from "../statusCode";
import AppError, { ErrorType } from "./index";

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(ErrorType.BAD_REQUEST, statusCodes.BAD_REQUEST, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(ErrorType.NOT_FOUND, statusCodes.NOT_FOUND, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access Dined") {
    super(ErrorType.FORBIDDEN, statusCodes.FORBIDDEN, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "You are not authenticated") {
    super(ErrorType.UNAUTHORIZED, statusCodes.UNAUTHORIZED, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "conflict") {
    super(ErrorType.CONFLICT, statusCodes.FORBIDDEN, message);
  }
}

export class ServerError extends AppError {
  constructor(message: string = "Internal Server Error") {
    super(ErrorType.SERVER_ERROR, statusCodes.SERVER_ERROR, message);
  }
}


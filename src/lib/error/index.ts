import { Response } from "express";

export enum ErrorType {
  BAD_REQUEST = "BadRequest",
  NOT_FOUND = "NotFound",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_IMPLEMENTED = "NotImplemented",
  CONFLICT = "Conflict",
  SERVICE_UNAVAILABLE = "Serivce_unavailabe",
  SERVER_ERROR = "ServerError",
}

class AppError extends Error {
  type: ErrorType;
  statusCode: number;
  constructor(type: ErrorType, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static handle(err: AppError, res: Response) {
    res.status(err.statusCode || 500).json({
      type: err.type || ErrorType.SERVER_ERROR,
      message: err.message || "Internal Server Error",
    });
  }
}

export default AppError;

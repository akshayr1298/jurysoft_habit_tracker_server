import { NextFunction, Response } from "express";
import logger from "../lib/logger";
import statusCodes from "../lib/statusCode";
import userService from "../service/userService";
import AppError from "../lib/error";
import { AuthenticatedRequest } from "../@types/type";

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id: string = req.user.userId;
    const response = await userService.getProfile(id);
    return res.status(statusCodes.OK).json({
      message: "profile fetch successfully",
      code: statusCodes.OK,
      success: true,
      data: response,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      logger.error(error.message);
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        code: error.statusCode,
      });
    }
  }
};

/* Add user profile udpate api */

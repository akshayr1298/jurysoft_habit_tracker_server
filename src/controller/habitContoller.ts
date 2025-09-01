import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import habitService from "service/habitService";
import statusCodes from "lib/statusCode";

export const addHabit = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const response = await habitService.createHabit(req.body, req.user.userId);
    return res
      .status(statusCodes.CREATED)
      .json({
        message: "habit added successfully",
        code: statusCodes.CREATED,
        success: true,
        data: response,
      });
  } catch (error: any) {
    logger.error(error.message);
    return res
      .status(error.statusCode)
      .json({ message: error.message, success: false, code: error.statusCode });
  }
};

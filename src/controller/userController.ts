import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import statusCodes from "../lib/statusCode";
import userService from "../service/userService";

export const profile = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = req.user.userId;
    const response = await userService.getProfile(id);
    return res.status(statusCodes.OK).json({
      message: "profile fetch successfully",
      code: statusCodes.OK,
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



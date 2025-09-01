import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import authService from "../service/authService";
import statusCodes from "../lib/statusCode";

export const userRegisteration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const response = await authService.signup(req.body);
    return res.status(statusCodes.CREATED).json({
      message: "Account registed successfully",
      success: true,
      code: 201,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: any) {
    logger.error(error.message);
    return res
      .status(error.statusCode)
      .json({ message: error.message, success: false, code: error.statusCode });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    return res.status(statusCodes.OK).json({
      message: "Account login successfully",
      success: true,
      code: 200,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: any) {
    logger.error(error.message);
    return res
      .status(error.statusCode)
      .json({ message: error.message, success: false, code: error.statusCode });
  }
};

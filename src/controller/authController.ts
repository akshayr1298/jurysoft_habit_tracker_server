import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import authService from "../service/authService";
import statusCodes from "../lib/statusCode";
import AppError from "../lib/error";

//? user registeration API
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise}
 */
export const userRegisteration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const response = await authService.signup(req.body);
    return res.status(statusCodes.CREATED).json({
      //* success response
      message: "Account registed successfully",
      success: true,
      code: 201,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      logger.error(error.message); //! exception logger
      return res
        .status(error.statusCode) //! exception response
        .json({
          message: error.message,
          success: false,
          code: error.statusCode,
        });
    }
  }
};

//? user Login API
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise}
 */

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    return res.status(statusCodes.OK).json({
      //* success response
      message: "Account login successfully",
      success: true,
      code: 200,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      logger.error(error.message); //! exception message
      return res
        .status(error.statusCode) //! exception response
        .json({
          message: error.message,
          success: false,
          code: error.statusCode,
        });
    }
  }
};

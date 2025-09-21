import { NextFunction, Request, Response } from "express";
import logger from "../lib/logger";
import habitService from "../service/habitService";
import statusCodes from "../lib/statusCode";
import AppError from "../lib/error";
import { AuthenticatedRequest, ParamsRequest } from "../@types/type";

export const addHabit = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const response = await habitService.createHabit(req.body, req.user.userId);
    return res.status(statusCodes.CREATED).json({
      message: "habit added successfully",
      code: statusCodes.CREATED,
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

export const markDone = async (
  req: ParamsRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const response = await habitService.markDone(id);
    return res.status(statusCodes.OK).json({
      message: "habit marked done successfully",
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

export const resetHabit = async (
  req: ParamsRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const response = await habitService.resetHabit(id);
    return res.status(statusCodes.OK).json({
      message: "habit reset successfully",
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

export const getAllHabits = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { filter, title }: string | any = req.query;
    const userId: string = req.user.userId;
    const response = await habitService.getAllHabits(filter, title, userId);
    return res.status(statusCodes.OK).json({
      message: "habit fetch successfully",
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

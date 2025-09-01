import { Types } from "mongoose";
import AppError from "../lib/error";
import { ConflictError, ServerError } from "../lib/error/error";
import HabitModel, { HabitInterface } from "../models/habit";
import logger from "../lib/logger";

const habitService = {
  async createHabit(data: HabitInterface, userId: string): Promise<any> {
    try {
      const { title, description, startDate }: HabitInterface = data;
      const existingHabit = await HabitModel.findOne({ userId, title });
      if (existingHabit) {
        throw new ConflictError(`This habit already exists for the user.`);
      }
      const newHabit = await HabitModel.create({
        userId: new Types.ObjectId(userId),
        title,
        description,
        startDate: new Date(startDate),
      });
      logger.info(
        `habbit added succcessfully by userId:${userId} habitId: ${newHabit.id}`
      );
      return newHabit;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },
};

export default habitService;

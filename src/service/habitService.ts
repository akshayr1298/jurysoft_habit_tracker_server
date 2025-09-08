import { Types } from "mongoose";
import AppError from "../lib/error";
import { ConflictError, NotFoundError, ServerError } from "../lib/error/error";
import HabitModel, { HabitInterface } from "../models/habit";
import logger from "../lib/logger";
import { isToday } from "../utils/helper";

const habitService = {
  async createHabit(
    data: HabitInterface,
    userId: string
  ): Promise<HabitInterface> {
    try {
      const { title, description, startDate }: HabitInterface = data;
      const existingHabit = await HabitModel.findOne(
        {
          userId: new Types.ObjectId(userId),
          title: { $regex: title, $options: "i" },
        },
        { title: 1 }
      );
      if (existingHabit) { //* check habit is already exist or not
        logger.warn(
          `This ${existingHabit.title} habit already exists for the user with userID ${userId}`
        );
        throw new ConflictError(
          `This ${existingHabit.title} habit already exists for the user.`
        );
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

  async markDone(id: string): Promise<Partial<HabitInterface> | null> {
    try {
      const habit = await HabitModel.findById(id);
      if (!habit) {
        throw new NotFoundError("Habit not found.");
      }

      const alreadyDoneToday = habit.completedDates.some((date) =>
        isToday(date)
      );

      if (alreadyDoneToday) {
        throw new ConflictError("You already marked as done");
      }

      const updatedHabit = await HabitModel.findByIdAndUpdate(
        id,
        { $push: { completedDates: new Date() } },
        { new: true }
      );
      return updatedHabit;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },

  async resetHabit(id: string): Promise<Partial<HabitInterface> | null> {
    try {
      const habit = await HabitModel.findByIdAndUpdate(
        id,
        { completedDates: [] },
        { new: true }
      );
      if (!habit) {
        throw new NotFoundError("Habit not found.");
      }
      return habit;
    } catch (error: any) {
      console.log('err',error)
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },

  async getAllHabits(
    filter: string,
    title: string,
    userId: string
  ): Promise<any> {
    try {
      const matchStage: any = {
        userId: new Types.ObjectId(userId),
      };
      //* filter based on title
      if (title) {
        matchStage.title = { $regex: title, $options: "i" };
      }
      //* filter based on completed dates
      if (filter === "completed") {
        matchStage.completedDates = { $exists: true, $ne: [] }; 
      } else if (filter === "notCompleted") {
        matchStage.completedDates = { $eq: [] }; 
      }
   
      const pipeline: any = [
        { $match: matchStage },
        { $sort: { createdAt: -1 } }, 
      ];
      //* agregation pipeline
      const habits = await HabitModel.aggregate(pipeline);
      return habits;
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

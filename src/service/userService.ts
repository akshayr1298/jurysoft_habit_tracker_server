import UserModel, { UserModelInterface } from "../models/user";
import AppError from "../lib/error";
import { ServerError } from "../lib/error/error";
import { Types } from "mongoose";
import { HabitInterface } from "../models/habit";

const userService = {
  async getProfile(id: string): Promise<Partial<UserModelInterface> | null> {
    try {
      const user = await UserModel.findById(
        { _id: new Types.ObjectId(id) },
        { _id: 0, firstName: 1, lastName: 1 }
      ).lean();
      return user;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },

  async addHabit(body: HabitInterface) {
    
  },
};
export default userService;

import UserModel from "../models/user";
import AppError from "../lib/error";
import { ServerError } from "../lib/error/error";
import { Types } from "mongoose";

const userService = {
  async getProfile(id: string) {
    try {
      console.log(id);

      const user = await UserModel.findById(
        { _id: new Types.ObjectId(id) },
        { firstName: 1, lastName: 1 }
      );
      return user;
    } catch (error: any) {
      console.log("err", error);

      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },
};
export default userService;

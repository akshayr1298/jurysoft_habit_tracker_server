import AppError from "../lib/error";
import userModel, { UserModelInterface } from "../models/user";
import { ConflictError, ServerError } from "../lib/error/error";
import { hashPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import config from "../config/env";

const authService = {
  /**
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */

  async signup(
    data: UserModelInterface
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { firstName, lastName, email, password } = data;
      const userExist = await userModel.findOne({ email: email }, { id: true });
      if (userExist) {
        throw new ConflictError(
          `This email is ${email} already registered try another email`
        );
      }
      const hashedPassword = await hashPassword(password);
      const user = await userModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      let secret: string | any = config.jwtSecret;
      const accessToken: string = jwt.sign(
        { userId: user.id, eamil: user.email },
        secret,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken: string = jwt.sign(
        { userId: user.id, email: user.email },
        secret,
        {
          expiresIn: "5d",
        }
      );
      const token = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      return token;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new ServerError();
      }
    }
  },
};

export default authService;

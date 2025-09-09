import AppError from "../lib/error";
import UserModel, { UserModelInterface } from "../models/user";
import {
  ConflictError,
  ServerError,
  UnauthorizedError,
} from "../lib/error/error";
import { comparePassword, hashPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import config from "../config/env";
import logger from "../lib/logger";

const authService = {
 /**
  * 
  * @param {UserModelInterface} data 
  * @returns {Promise}
  */

  async signup(
    data: UserModelInterface
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { firstName, lastName, email, password } = data;
      const userExist = await UserModel.findOne({ email: email }, { id: true });
      if (userExist) { //* check user aleady registered or not
        throw new ConflictError( 
          `This email is ${email} already registered try another email`
        );
      }
      const hashedPassword = await hashPassword(password);
      const user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      logger.info(`user registered successfully userId: ${user.id}`);
       //* generate token
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

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await UserModel.findOne({ email: email });
      //! check user credential
      if (!user) {
        throw new UnauthorizedError("Invalid credential");
      }
      //! check password is correct or not
      const checkPassword = await comparePassword(password, user.password);
      if (!checkPassword) {
        throw new UnauthorizedError("Invalid credential");
      }
      logger.info(`user login successfully userId: ${user.id}`);
      //* generate token
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

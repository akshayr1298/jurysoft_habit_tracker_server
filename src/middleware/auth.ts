import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../lib/statusCode";
import logger from "../lib/logger";
import config from "../config/env";

const auth = (
  req: Request | any,
  res: Response,
  next: NextFunction
): Response | void => {
  try {

    
     const authHeader = req.headers.authorization;
    //* Check if the Authorization header is present
    if (!authHeader) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: 'Authorization header is missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers['refresh-token'];

    let secret: string = config.jwtSecret ;
    //* check the access token is expire or not
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          //* Access token has expired, try to refresh it
          jwt.verify(refreshToken, secret, (err: any, user: any) => {
            if (err) { //* if refresh token has expire then return UNAUTHORIZED error message
              logger.error(err.message);
              return res
                .status(statusCodes.UNAUTHORIZED)
                .json({ message: "Invalid refresh token" });
            }

            //* Generate a new access token
            const newAccessToken = jwt.sign({ email: user.email }, secret, {
              expiresIn: "15m",
            });

            //* Set the new access token in the response cookies
            res.cookie("accessToken", newAccessToken, {
              maxAge: 86400000,
              httpOnly: true,
            });

            //* Proceed to the next middleware
            req.user = user;
            next();
          });
        } else {
          logger.error("Invalid access token");
          return res
            .status(statusCodes.UNAUTHORIZED)
            .json({ message: "Invalid access token" });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error: any) {
    logger.error(error.message);
    next(error);
  }
};

export default auth;

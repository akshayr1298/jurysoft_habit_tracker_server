import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import statusCodes from "../lib/statusCode";
import logger from "../lib/logger";

//* validation middleware it will validate each payload before it reach controller
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); //* validate payload or req.body based specific schema
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) { //! throw error if it does not match the schema
        const errorMessages: string = error.issues[0].message;
        logger.error(`Invalid data: ${errorMessages}`)
        res
          .status(statusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", message: errorMessages });
      } else {
        res
          .status(statusCodes.SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}

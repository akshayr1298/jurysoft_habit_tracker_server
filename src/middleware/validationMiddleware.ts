import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import statusCodes from "../lib/statusCode";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages: string = error.issues[0].message;
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

import express from "express";
import authRouter from "./authRoute";
import userRouter from "./userRoute";
import auth from "../middleware/auth";
import habitRouter from "./habitRoute";
/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application) {
  const router: express.Router = express.Router();

  app.use("/auth", authRouter);
  app.use("/profile", auth, userRouter);
  app.use("/habits", auth, habitRouter);
  app.use(router);
}

import express from "express";
import authRouter from './authRoute'
/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application) {
  const router: express.Router = express.Router();
  
  app.use("/auth",authRouter)
  app.use(router);
}

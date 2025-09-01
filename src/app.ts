import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import config from "./config/env";
import logger from "./lib/logger";
import { connectDB } from "./config/database";
import * as Routes from "./routes";

dotenv.config();

const app: express.Application = express();
const origin: string = process.env.ORIGIN ?? "*";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: {
    success: false,
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,  // disable X-RateLimit headers
});

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
  })
);

app.use(limiter);
/*application middleware config in routes */
app.get("/", (req: Request, res: Response) => {
  console.log("server is running");
});
Routes.init(app);

// error handling-middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("NOT FOUND") as any;
  error.status = 404;
  next(error);
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.statusCode ?? 500;
  const errorMessage = err.message ?? "Something went to wong!";  
  return res.status(errorStatus).json({
    succes: false,
    status: errorStatus,
    message: errorMessage,
    // stack: err.stack,
  });
});

const port = config.port;
app.listen(port, async () => {
  await connectDB();
  logger.info(`server is running on port: ${port}`);
});

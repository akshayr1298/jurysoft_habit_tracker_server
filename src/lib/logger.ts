
import { transports, format, createLogger } from "winston";
import "winston-daily-rotate-file"; //
import * as path from "path";
import fs from "fs";
const logsDirectory = path.resolve(__dirname, "../../logs");

// Create the logger instance
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logger = createLogger({
  transports: [
    // Console transport for development
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),

    // Error log file transport
    new transports.DailyRotateFile({
      level: "error",
      filename: `${logsDirectory}/error-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
    }),

    // Warning log file transport
    new transports.DailyRotateFile({
      level: "warn",
      filename: `${logsDirectory}/warn-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
    }),

    // Info and below log file transport
    new transports.DailyRotateFile({
      level: "info",
      filename: `${logsDirectory}/info-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
    }),
  ],
});

export default logger;

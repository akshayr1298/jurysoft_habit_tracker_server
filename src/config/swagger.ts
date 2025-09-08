import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express"; // <-- use Application instead of Express
import logger from "../lib/logger";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Docs",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000/" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        refreshToken: {
          type: "apiKey",
          in: "header",
          name: "refresh-token", // 👈 your refresh token header key
        },
      },
      schemas: {
        UserSignup: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: { type: "string", example: "Akshay" },
            lastName: { type: "string", example: "Panicker" },
            email: {
              type: "string",
              format: "email",
              example: "test@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Secret123!",
            },
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "test@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Secret123!",
            },
          },
        },
        Profile: {
          type: "object",
          properties: {
            id: { type: "string", example: "user_123" },
            firstName: { type: "string", example: "Akshay" },
            lastName: { type: "string", example: "R" },
            email: {
              type: "string",
              format: "email",
              example: "akshay@example.com",
            },
          },
        },
        Habits: {
          type: "object",
          required: ["title", "discription","startDate"],
          properties: {
            title: { type: "string", example: "Read Books" },
            discription: { type: "string", example: "Read daily 10 pages" },
            startDate: { type: "string", example: "2025-09-04" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Application, port: number) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  logger.info(`Swagger Docs available at http://localhost:${port}/docs`);
}

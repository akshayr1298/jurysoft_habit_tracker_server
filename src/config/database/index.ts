import mongoose from "mongoose";
import config from '../env'
import logger from "../../lib/logger"


export const connectDB = async () => {
  try {
    const uri: string = config.MONGODB_URI ?? "";

    const db = await mongoose.connect(uri);
    logger.info({
      message: `Database connected successfully: ${db.connections[0].name}`,
    });

    return mongoose.connection;
  } catch (error: any) {
    logger.error({
      message: `connection Error : ${error.message}`,
    });
    process.exit(1);
  }
};


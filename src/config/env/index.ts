import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  port: string | number;
  origin: string;
  MONGODB_URI: string;
  jwtSecret: string;
}

const development: IConfig = {
  port: process.env.PORT || 4000,
  origin: process.env.ORIGIN ?? "",
  MONGODB_URI: process.env.DBURL ?? "mongodb://localhost:27017/",
  jwtSecret: process.env.SECRET ?? "e8e026ea45db7149c886d0a0af75533b",
};

export default development;

import dotenv from "dotenv";
import pathModule from "path";

//add path
dotenv.config({ path: pathModule.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};

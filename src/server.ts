import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

//connect to mongodb
async function connect() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`server lisening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
connect();

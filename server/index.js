import dotenv from "dotenv";
import { connectDb } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 1111;

connectDb()
  .then(() => {
    console.log("database connection successfully");
    app.listen(port, () => {
      console.log(`app is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("database connection failed " + error.message);
  });

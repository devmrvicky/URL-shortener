import express from "express";

const app = express();

app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "server tested successfully" });
});

// import router
import { router as URLRouter } from "./routes/url.routes.js";

app.use("/", URLRouter);

export { app };

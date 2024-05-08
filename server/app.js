import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
  res.status(200).json({ message: "server tested successfully" });
});

// import router
import { router as URLRouter } from "./routes/url.routes.js";

app.use("/", URLRouter);

export { app };

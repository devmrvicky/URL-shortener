import express from "express";
import path from "node:path";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>from test route</h1>");
});

// import router
import { router as URLRouter } from "./routes/url.routes.js";

app.use("/", URLRouter);

export { app };

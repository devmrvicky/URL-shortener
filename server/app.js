import express from "express";
import path from "node:path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>from test route</h1>");
});

// import router
import { router as homeRouter } from "./routes/static/static.routes.js";
import { router as URLRouter } from "./routes/url.routes.js";
import {router as userRouter} from './routes/user.routes.js'

app.use("/", homeRouter);
app.use("/url", URLRouter);
app.use("/auth", userRouter)

export { app };

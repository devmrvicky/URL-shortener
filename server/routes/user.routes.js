import { Router } from "express";
import { signupUser } from "../controller/user.controller.js";

const router = Router();

router.route("/signup").post(signupUser);

export { router };
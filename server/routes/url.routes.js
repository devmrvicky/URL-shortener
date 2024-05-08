import { Router } from "express";
import {
  createShortURL,
  redirectToMainURL,
} from "../controller/url.controller.js";

const router = Router();

router.route("/url").post(createShortURL);
router.route("/:shortURLId").get(redirectToMainURL);

export { router };

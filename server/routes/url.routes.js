import { Router } from "express";
import {
  createShortURL,
  getAllShortUrlIds,
  redirectToMainURL,
} from "../controller/url.controller.js";

const router = Router();

router.route("/url").post(createShortURL);
router.route('/short-url-ids').get(getAllShortUrlIds)
router.route("/:shortURLId").get(redirectToMainURL);

export { router };

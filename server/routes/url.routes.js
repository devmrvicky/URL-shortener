import { Router } from "express";
import {
  createShortURL,
  getAllShortUrlIds,
  redirectToMainURL,
  deleteShortURLId,
  getShortUrlAnalytics,
} from "../controller/url.controller.js";

const router = Router();

router.route("/url").post(createShortURL);
router.route("/short-url-ids").get(getAllShortUrlIds);
router.route("/delete/:shortURLId").delete(deleteShortURLId);
router.route("/:shortURLId").get(redirectToMainURL);
router.route("/analytics/:shortURLId").get(getShortUrlAnalytics);

export { router };

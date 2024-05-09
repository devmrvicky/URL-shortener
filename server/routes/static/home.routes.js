import { Router } from "express";
import { getHomePage } from "../../controller/url.controller.js";

const router = Router();

router.route("/").get(getHomePage);

router.route("/about").get(async (req, res) => {
  try {
    res.render("about");
  } catch (error) {}
});

export { router };

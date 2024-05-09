import { Router } from "express";

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    res.render("home");
  } catch (error) {}
});

export { router };

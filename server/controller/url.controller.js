import shortid from "shortid";
import { URLModel } from "../model/url.model.js";

const createShortURL = async (req, res) => {
  try {
    const redirectURL = req.body.url;
    const shortURLId = shortid();
    const urlDoc = await URLModel.create({
      shortURLId,
      redirectURL,
      clickHistory: [],
    });
    res.status(201).json({ message: "url short successfully", urlDoc });
  } catch (error) {
    console.log("unable to short url " + error.message);
  }
};

const redirectToMainURL = async (req, res) => {
  try {
    const shortURLId = req.params.shortURLId;
    const entry = await URLModel.findOneAndUpdate(
      {
        shortURLId,
      },
      {
        $push: {
          clickHistory: { timestamp: Date.now() },
        },
      }
    );
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log("cannot redirected: " + error);
  }
};

export { createShortURL, redirectToMainURL };

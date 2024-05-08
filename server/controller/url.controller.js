import shortid from "shortid";
import { URLModel } from "../model/url.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createShortURL = async (req, res) => {
  try {
    console.log(req.body);
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

const getAllShortUrlIds = async (req, res) => {
  try {
    const shortUrlIds = await URLModel.find();
    res.status(200).json(
      new ApiResponse({
        status: 200,
        message: "fetched all short url ids",
        data: shortUrlIds,
      })
    );
  } catch (error) {
    throw new ApiError({
      status: 500,
      message: "cannot fetched short url ids",
      error: error,
    });
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

export { createShortURL, getAllShortUrlIds, redirectToMainURL };

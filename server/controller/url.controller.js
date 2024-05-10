import shortid from "shortid";
import { URLModel } from "../model/url.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getHomePage = async (req, res) => {
  try {
    const allShortUrlIds = await URLModel.find();
    console.log(allShortUrlIds);
    res.render("home", {
      urls: allShortUrlIds,
      user: null,
    });
  } catch (error) {}
};

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
    await getHomePage(req, res);
    // res.status(201).json(
    //   new ApiResponse({
    //     status: 201,
    //     message: "url short successfully",
    //     data: urlDoc,
    //   })
    // );
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
    // res.render("home", {
    //   ids: shortUrlIds,
    // });
  } catch (error) {
    throw new ApiError({
      status: 500,
      message: "cannot fetched short url ids",
      // error: error,
    });
  }
};

const deleteShortURLId = async (req, res) => {
  try {
    const shortURLId = req.params.shortURLId;
    const response = await URLModel.deleteOne({ shortURLId });
    if (!response) {
      throw new ApiError({
        status: 400,
        message: "Cannot delete this document",
      });
    }
    await getHomePage(req, res);
    console.log("Document deleted successfully");
    // res.status(200).json(
    //   new ApiResponse({
    //     status: 200,
    //     message: "Document deleted successfully",
    //   })
    // );
  } catch (error) {
    throw new ApiError({
      status: 500,
      message: error.message,
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

const getShortUrlAnalytics = async (req, res) => {
  try {
    const shortURLId = req.params.shortURLId;
    const shortURLDoc = await URLModel.findOne({
      shortURLId,
    });
    if (!shortURLDoc) {
      throw new ApiError({
        status: 404,
        message: "document not found",
      });
    }

    res.status(200).json(
      new ApiResponse({
        status: 200,
        message: "document found successfully",
        data: shortURLDoc,
      })
    );
  } catch (error) {
    throw new ApiError({
      status: 404,
      message: error.message,
    });
  }
};

export {
  createShortURL,
  getAllShortUrlIds,
  deleteShortURLId,
  redirectToMainURL,
  getShortUrlAnalytics,
  getHomePage,
};

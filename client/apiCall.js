import { updateShortURLTable } from "./main.js";

const BASE_URL = "http://localhost:8000";

const getAllShortUrlIds = async () => {
  try {
    const response = await fetch(`${BASE_URL}/short-url-ids`);
    return response.json();
  } catch (error) {
    console.error("cannot get all short url ids: " + error.message);
  }
};

const deleteShortURL = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await updateShortURLTable();
    }
  } catch (error) {
    console.error(error.message);
  }
};

// update analytic modal
const getShortURLAnalytics = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/analytics/${id}`)
    return res.json()
  } catch (error) {
    console.error(error.message)
  }
}

const generateShortUrlId = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ url }),
      // body: url,
    });
    return response.json();
  } catch (error) {
    console.error("cannot generate short url id: " + error.message);
  }
};

export { generateShortUrlId, deleteShortURL, getAllShortUrlIds, getShortURLAnalytics };

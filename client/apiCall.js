const BASE_URL = "http://localhost:8000";

const getAllShortUrlIds = async () => {
  try {
    const response = await fetch(`${BASE_URL}/short-url-ids`)
    return response.json()
  } catch (error) {
    console.error('cannot get all short url ids: ' + error.message)
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

export { generateShortUrlId, getAllShortUrlIds };

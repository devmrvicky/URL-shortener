import { generateShortUrlId, getAllShortUrlIds } from "./apiCall.js";

const shortUrlGenerateForm = document.querySelector("form");
const shortUrlIdsTableBody = document.querySelector("table tbody");

shortUrlGenerateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputUrl = e.currentTarget.querySelector("#url").value;
  try {
    const data = await generateShortUrlId(inputUrl);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
});

window.onload = () => {
  (async () => {
    const data = await getAllShortUrlIds();
    const html = data.data
      .map(
        (doc, index) => `<tr>
    <td>${index}</td>
    <td>
      <a href="http://localhost:8000/${doc.shortURLId}">http://localhost:8000/${doc.shortURLId}</a>
    </td>
    <td>
    <a href="${doc.redirectURL}">${doc.redirectURL}</a>
    </td>
    <td>${doc.clickHistory.length}</td>
  </tr>`
      )
      .join("");
    shortUrlIdsTableBody.innerHTML = html;
  })();
};

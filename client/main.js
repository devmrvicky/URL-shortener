import {
  generateShortUrlId,
  getAllShortUrlIds,
  deleteShortURL,
} from "./apiCall.js";

const shortUrlGenerateForm = document.querySelector("form");
const shortUrlIdsTableBody = document.querySelector("table tbody");

shortUrlGenerateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputUrl = e.currentTarget.querySelector("#url").value;
  try {
    const res = await generateShortUrlId(inputUrl);
    if (res.success) {
      await updateShortURLTable();
    }
  } catch (error) {
    console.error(error.message);
  }
});

const updateShortURLTable = async () => {
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
  <td>
      <button type="button" class="delete-short-url-id" data-id=${doc.shortURLId}>delete</button>
  </td>
</tr>`
    )
    .join("");
  shortUrlIdsTableBody.innerHTML = html;

  // get all delete btns
  const allDeleteBtns = document.querySelectorAll(".delete-short-url-id");
  allDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      deleteShortURL(id);
      // await updateShortURLTable();
    });
  });
};

window.onload = () => {
  (async () => {
    await updateShortURLTable();
  })();
};

export { updateShortURLTable };

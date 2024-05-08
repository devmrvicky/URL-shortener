import {
  generateShortUrlId,
  getAllShortUrlIds,
  deleteShortURL,
  getShortURLAnalytics,
} from "./apiCall.js";

const shortUrlGenerateForm = document.querySelector("form");
const shortUrlIdsTableBody = document.querySelector("table tbody");
const analyticModal = document.querySelector("dialog");
const closeAnalyticModalBtn = document.querySelector("#close-dialog");
const analyticContentElem = document.querySelector(".modal-content");

// close analytic modal
closeAnalyticModalBtn.addEventListener("click", () => {
  analyticModal.close();
});

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
      <button type="button" class="view-analytic" data-id=${doc.shortURLId}>view</button>
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
    });
  });

  // show analytic modal
  const allOpenAnalyticModalBtns = document.querySelectorAll(".view-analytic");
  allOpenAnalyticModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      analyticModal.showModal();
      updateAnalyticModal(id);
    });
  });
};

const updateAnalyticModal = async (id) => {
  try {
    const analyticData = await getShortURLAnalytics(id);
    if (!analyticData) throw new Error("cannot get analytic data");
    const { shortURLId, redirectURL, clickHistory } = analyticData.data;
    const modalDetailsElem = analyticContentElem.querySelectorAll("details");
    modalDetailsElem.forEach((summary) => {
      switch (summary.dataset.name) {
        case "short-url":
          summary.children[1].textContent = shortURLId;
          break;
        case "redirect-url":
          summary.children[1].textContent = redirectURL;
          break;
        case "click-history":
          summary.children[1].textContent = clickHistory.length;
          break;
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

window.onload = () => {
  (async () => {
    await updateShortURLTable();
  })();
};

export { updateShortURLTable };

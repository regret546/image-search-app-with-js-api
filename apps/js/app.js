const accessKey = "HQNw2XhEk-CYUfRt3RvixmJr8Z-mTFyWpRfWIF7Obrg";

const formEl = document.querySelector("form");
const forminputEl = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const showMore = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;

/* Query Unplash */
async function queryApi() {
  try {
    inputData = forminputEl.value;
    const config = {
      params: { p: page, query: inputData, client_id: accessKey },
    };
    const url = `https://api.unsplash.com/search/photos`;
    const response = await axios.get(url, config);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}

/* Generate images base on the unplash query result */
const generateImages = function (data) {
  data.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
};

const searchImages = async function () {
  const results = await queryApi();
  generateImages(results);
  page++;
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let page = 1;
  if (page === 1) {
    searchResults.innerHTML = "";
    searchImages();
    showMore.style.display = "block";
  }
});

showMore.addEventListener("click", (e) => {
  e.preventDefault();
  searchImages();
});

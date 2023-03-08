// Gets movie id from the URL \\
const path = window.location.pathname;
const movieId = path.split("/").pop();

// Adds the rating to the movie \\
async function showRating() {
  const res = await fetch(`/api/movies/${movieId}/ratings`);
  const payload = await res.json();
  const rating = Math.round(Number(payload.rating));
  const starsTemplate = getStars(rating);

  let template = `
  <h3>Betyg ${rating}</h3>
  ${starsTemplate}
  `;

  document.querySelector(".rating").insertAdjacentHTML("beforeend", template);
}
showRating();

// Shows screenings with pagination if needed \\
const screeningUI = document.querySelector(".screenings");
let currentPage = 1;
let pageCount;

async function renderScreenings() {
  const res = await fetch(`/api/movies/${movieId}/screenings?page=${currentPage}`);
  const payload = await res.json();
  const page = payload.meta.pagination.page;
  pageCount = payload.meta.pagination.pageCount;

  // Adds the header
  let template = `<h2>Filmvisningar ${
    pageCount > 1 ? `<span>Sida: ${page} av ${pageCount}</span></h2>` : `</h2>`
  }`;

  payload.data.map((screening) => {
    const room = screening.attributes.room;
    const date = screening.attributes.start_time.date;
    const time = screening.attributes.start_time.time;

    // Adds the screenings
    template += `
        <li>
            <div>
                <h3>${room}</h3>
                <p>${date}<span style="margin-left: 1rem;">${time}</span></p>
            </div>
            <button>Boka</button>
        </li>`;
  });

  // Adds next and before buttons
  if (pageCount > 1) {
    template += `
    <div class="btns">
      ${
        currentPage == 1
          ? `<button onclick="next()">Nästa</button>`
          : `<button onclick="before()">Föregående</button> <button onclick="next()">Nästa</button>`
      }
    </div>`;
  }

  screeningUI.insertAdjacentHTML("beforeend", template);
}
renderScreenings();

function next() {
  currentPage >= pageCount ? (currentPage = 1) : currentPage++;
  screeningUI.style.height = `${screeningUI.offsetHeight}px`;
  screeningUI.classList.add("screeningsAnim");
  setTimeout(() => {
    screeningUI.classList.remove("screeningsAnim");
  }, 900);
  screeningUI.innerHTML = "";
  renderScreenings();
}
function before() {
  currentPage <= 1 ? (currentPage = pageCount) : currentPage--;
  screeningUI.style.height = `${screeningUI.offsetHeight}px`;
  screeningUI.classList.add("screeningsAnim");
  setTimeout(() => {
    screeningUI.classList.remove("screeningsAnim");
  }, 900);
  screeningUI.innerHTML = "";
  renderScreenings();
}

// Shows reviews with pagination \\
const reviewContainer = document.querySelector(".review-container");
let reviewPage;
let reviewPageCount;

async function getReviews() {
  reviewPage = 1;
  const res = await fetch(`/api/reviews/${movieId}?page=${reviewPage}`);
  const payload = await res.json();
  reviewPageCount = payload.meta.pagination.pageCount;
  renderFirstPage(payload.data);
}

function renderFirstPage(data) {
  reviewContainer.innerHTML = "";
  let template = `<h2>Recensioner</h2><p class="review-page">Sida: ${reviewPage} av ${reviewPageCount}</p>`;
  data.map((review) => {
    let rating = review.attributes.rating;
    let comment = review.attributes.comment;
    let author = review.attributes.author;
    const stars = getStars(rating);

    template += `
        <li>
            <div>
                <h3>${stars}</h3>
                <p>${comment}</p>
                <p class="review-author">${author}</p>           
            </div> 
        </li>
        `;
  });
  reviewContainer.insertAdjacentHTML("beforeend", template);
  reviewContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="review-btn-container">
    <button class="next-btn">Nästa</button>
    <div> 
    `
  );
  const nextBtn = document.querySelector(".next-btn");
  nextBtn.addEventListener("click", nextReviewPage);
}

getReviews();

async function nextReviewPage(data) {
  reviewPage++;
  if (reviewPage > reviewPageCount) {
    getReviews();
  } else {
    const res = await fetch(`/api/reviews/${movieId}?page=${reviewPage}`);
    const payload = await res.json();
    renderNextPage(payload.data);
  }

  reviewContainer.style.height = `${reviewContainer.offsetHeight}px`;
  reviewContainer.classList.add("screeningsAnim");
  setTimeout(() => {
    reviewContainer.classList.remove("screeningsAnim");
  }, 900);
}

function renderNextPage(data) {
  reviewContainer.innerHTML = "";
  let template = `<h2>Recensioner</h2><p class="review-page">Sida: ${reviewPage} av ${reviewPageCount}</p>`;
  data.map((review) => {
    let rating = review.attributes.rating;
    let comment = review.attributes.comment;
    let author = review.attributes.author;
    const stars = getStars(rating);

    template += `
        <li>
            <div>
                <h3>${stars}</h3>
                <p>${comment}</p>
                <p class="review-author">${author}</p>           
            </div> 
        </li>
        `;
  });
  reviewContainer.insertAdjacentHTML("beforeend", template);
  reviewContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="review-btn-container">
    <button class="previous-btn">Föregående</button>
    <button class="next-btn">Nästa</button>
    <div> 
     `
  );

  const nextBtn = document.querySelector(".next-btn");
  nextBtn.addEventListener("click", nextReviewPage);
  const previousBtn = document.querySelector(".previous-btn");
  previousBtn.addEventListener("click", previousReviewPage);
}

async function previousReviewPage() {
  reviewPage--;
  if (reviewPage < 2) {
    getReviews();
  } else {
    const res = await fetch(`/api/reviews/${movieId}?page=${reviewPage}`);
    const payload = await res.json();
    renderNextPage(payload.data);
  }

  reviewContainer.style.height = `${reviewContainer.offsetHeight}px`;
  reviewContainer.classList.add("screeningsAnim");
  setTimeout(() => {
    reviewContainer.classList.remove("screeningsAnim");
  }, 900);
}

function renderNextPage(data) {
  reviewContainer.innerHTML = "";
  let template = `<h2>Recensioner</h2><p class="review-page">Sida: ${reviewPage} av ${reviewPageCount}</p>`;
  data.map((review) => {
    let rating = review.attributes.rating;
    let comment = review.attributes.comment;
    let author = review.attributes.author;
    const stars = getStars(rating);

    template += `
        <li>
            <div>
                <h3>${stars}</h3>
                <p>${comment}</p>
                <p class="review-author">${author}</p>           
            </div> 
        </li>
        `;
  });
  reviewContainer.insertAdjacentHTML("beforeend", template);
  reviewContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="review-btn-container">
    <button class="previous-btn">Föregående</button>
    <button class="next-btn">Nästa</button>
    <div>
    `
  );

  const nextBtn = document.querySelector(".next-btn");
  nextBtn.addEventListener("click", nextReviewPage);
  const previousBtn = document.querySelector(".previous-btn");
  previousBtn.addEventListener("click", previousReviewPage);
}

function getStars(rating) {
  const notFilled = 5 - rating;
  let stars = '';
  for(let i = 0; i < rating; i++) {
    stars += `<span class="star"></span>`;
  }
  stars += `<span class="star-empty"></span>`.repeat(notFilled);
  return stars;
}

// Send a review for the movie \\
let rate = document.querySelector("#rate");
let comment = document.querySelector("#addComment");
let authorName = document.querySelector("#addName");
let reviewBox = document.querySelector(".addReview");

// Change temporary content of adding review box into Thank you text 
function changeContent() {
  var form = document.getElementById("form")
  var originalContent = reviewBox.innerHTML;
  reviewBox.innerHTML = "Tack för din recension!";
  setTimeout(function() {
    reviewBox.innerHTML = originalContent;
  }, 10000) };

document.querySelector("#addBtn").addEventListener("click", async (ev) => {
  ev.preventDefault();

  const body = {
    author: authorName.value,
    comment: comment.value,
    rating: parseInt(rate.value),
  }

  const res = await fetch(`/api/reviews/${movieId}`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });



  document.querySelector("#rate").selectedIndex = 0;
  document.querySelector("#addComment").value = "";
  document.querySelector("#addName").value = "";

  // Animation for the reviews
  reviewContainer.style.height = `${reviewContainer.offsetHeight}px`;
  reviewContainer.classList.add("screeningsAnim");
  setTimeout(() => {
    reviewContainer.classList.remove("screeningsAnim");
  }, 900);
  reviewContainer.innerHTML = "";
  
  getReviews();
  changeContent();

});
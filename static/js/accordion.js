const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const accordionSection = document.querySelector(".accordion-cont");
const slider = document.createElement("div");
slider.classList.add("slider");
slider.ariaLabel ='role="listbox"';
let interval;
let margin = 0;

let currentSlide = 1;
async function getMovies() {
  const res = await fetch(`/api/movies`);
  const data = await res.json();

  return data;
}
const data = getMovies();
data.then((data) => {
  data.forEach((movie) => {
    const title = movie.attributes.title;
    const image = movie.attributes.image.url;
    const section = document.createElement("section");
    const id = movie.id;

    section.classList.add("slide");
    section.ariaLabel = 'role="option"';

    section.innerHTML = `<div class="slide-content">
    <h2>${title}</h2>
    
    <a href="/movies/${id}" class="slide-btn">Biljetter</a>
  </div>
  <img src="${image}" loading="lazy" alt="Film banner" layout="responsive" sizes="100%, 20rem"/>`;
    slider.appendChild(section);
    accordionSection.append(slider);
  });
});
const myTimeout = setTimeout(rest, 500);

function rest() {
  document.querySelector(".slide").id = "first-slide";
  const firstSlide = document.querySelector("#first-slide");
  const slides = document.querySelectorAll(".slide");

  let slideCount = slides.length;

  next.addEventListener("click", () => {
    clearInterval(interval);
    if (currentSlide >= slideCount) {
      margin = 0;
      currentSlide = 1;
      anim(500);
    } else {
      margin -= 100;
      currentSlide++;
      anim(100);
    }
    firstSlide.style.marginLeft = `${margin}%`;
    startInterval();
  });

  prev.addEventListener("click", () => {
    clearInterval(interval);
    if (currentSlide <= 1) {
      currentSlide = slideCount;
      margin = -100 * (slideCount - 1);
      anim(500);
    } else {
      currentSlide--;
      margin += 100;
      anim(100);
    }
    firstSlide.style.marginLeft = `${margin}%`;
    startInterval();
  });

  function startInterval() {
    interval = setInterval(() => {
      if (currentSlide >= slideCount) {
        margin = 0;
        currentSlide = 1;
        anim(500);
      } else {
        margin -= 100;
        currentSlide++;
        anim(150);
      }
      firstSlide.style.marginLeft = `${margin}%`;
    }, 7000);
  }

  startInterval();

  function anim(secs) {
    setTimeout(() => {
      const slideContent = slides[currentSlide - 1].children[0];
      slideContent.children[0].classList.add("header-anim");
      slideContent.children[1].classList.add("header-anim");

      setTimeout(() => {
        const slideContent = slides[currentSlide - 1].children[0];
        slideContent.children[0].classList.remove("header-anim");
        slideContent.children[1].classList.remove("header-anim");
      }, 1000);
    }, secs);
  }
}

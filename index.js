// API 1: https://ghibliapi.herokuapp.com/films

const filmsDataEl = document.querySelector(".movies__wrapper");
const searchBar = document.getElementById("input__search");
let filmsData = [];

searchBar.addEventListener("keyup", (event) => {
  const searchString = event.target.value.toLowerCase();
  const searchedFilms = filmsData.filter((film) => {
    return film.title.toLowerCase().includes(searchString);
  });
  displayFilms(searchedFilms);
});

async function renderFilms(filter) {
  const films = await fetch("https://ghibliapi.herokuapp.com/films");
  filmsData = await films.json();
  displayFilms(filmsData);

  if (filter === "ASCENDING_YEAR") {
    displayFilms(filmsData.sort((a, b) => a.release_date - b.release_date));
  } else if (filter === "DESCENDING_YEAR") {
    displayFilms(filmsData.sort((a, b) => b.release_date - a.release_date));
  } else if (filter === "RATING") {
    displayFilms(filmsData.sort((a, b) => b.rt_score - a.rt_score));
  }
}

function filterFilms(event) {
  renderFilms(event.target.value);
}

function showMovie(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/movie.html`;
}

const displayFilms = (films) => {
  const htmlString = films
    .map((film) => {
      return `<div class="movie" onclick="showMovie('${film.id}')">
      <figure class="movie__img--wrapper">
        <img
          src="${film.image}"
          alt=""
          class="movie__img"
        />
      </figure>
      <p class="movie__title">${film.title}</p>
      <p class="movie__year">${film.release_date}</p>
    </div>`;
    })
    .join("");
  filmsDataEl.innerHTML = htmlString;
};

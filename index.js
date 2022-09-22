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
  if (filter === 'DESCENDING_YEAR') {
    const filteredFilms = displayFilms(filter).sort((a, b) => a.release_date - b.release_date);
    console.log(filteredFilms);
  }
}

renderFilms();

function filterFilms(event) {
  renderFilms(event.target.value)
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
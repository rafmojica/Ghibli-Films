// API 1: https://ghibliapi.herokuapp.com/films

const filmsDataEl = document.querySelector(".movies__wrapper");

async function main() {
  const films = await fetch("https://ghibliapi.herokuapp.com/films");
  const filmsData = await films.json();
  filmsDataEl.innerHTML = filmsData.map((films) => filmsHTML(films)).join("");
}

main();

function showMovie(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/movie.html`;
}

function filmsHTML(films) {
  return `<div class="movie" onclick="showMovie('${films.id}')">
    <figure class="movie__img--wrapper">
      <img
        src="${films.image}"
        alt=""
        class="movie__img"
      />
    </figure>
    <p class="movie__title">${films.title}</p>
    <p class="movie__year">${films.release_date}</p>
  </div>`;
}

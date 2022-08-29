function showMovies(event) {
  event.preventDefault();

  let moviesAsObjects = [];
  fetch("../json/movies.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.movies.length; i++) {
        if (data.movies[i].ageLimit <= retrieveAgeLimit()) {
          moviesAsObjects.push(data.movies[i]);
        }
      }
      createForm(moviesAsObjects);
    });
}

function createForm(moviesAsObjects) {
  let movies = [];
  for (let i = 0; i < moviesAsObjects.length; i++) {
    console.log("moviesAsObjects[i].title", moviesAsObjects[i].title);
    movies.push(moviesAsObjects[i].title);
  }

  let select = document.createElement("select");
  select.name = "film-titles";
  select.id = "film-titles";

  for (const val of movies) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Välj film: ";
  label.htmlFor = "film-titles";

  document.getElementById("container").appendChild(label).appendChild(select);
}

function retrieveAgeLimit() {
  let age = 15; //default
  if (localStorage.getItem("age-limit")) {
    age = localStorage.getItem("age-limit");
  }
  return age;
}

document
  .querySelector("#accept-terms-button")
  .addEventListener("click", showMovies);

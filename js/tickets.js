const elAcceptTermsButton = document.querySelector("#accept-terms-button");
const elMovieContainer = document.querySelector("#container");
const elShowsContainer = document.querySelector("#containerForShows");
const elTicketForm = document.querySelector("#ticketForm");

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
  createSelectMovieTitle(movies);
}

function createSelectMovieTitle(movies) {
  let select = document.createElement("select");
  select.name = "film-titles";
  select.id = "film-titles";
  for (const val of movies) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  let defaultOption = getDefaultOption(select, "Välj en film:");
  select.appendChild(defaultOption);
  var label = document.createElement("label");
  label.innerHTML = "Välj film: ";
  label.htmlFor = "film-titles";
  document.getElementById("container").appendChild(label).appendChild(select);
}

function getDefaultOption(select, text) {
  var option = document.createElement("option");
  option.value = "none";
  option.text = text;
  option.selected = true;
  option.disabled = true;
  option.hidden = "hidden";
  return option;
}

function retrieveAgeLimit() {
  let age = 15; //default
  if (localStorage.getItem("age-limit")) {
    age = localStorage.getItem("age-limit");
  }
  return age;
}

function createSelectShow(event) {
  event.preventDefault();
  console.log("hi");

  let movie = getMovie();
  console.log(movie);
  let shows = [];

  fetch("../json/movies.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.movies.length; i++) {
        if (data.movies[i].title === movie) {
          for (let j = 0; j < data.movies[i].shows.length; j++) {
            shows.push(data.movies[i].shows[j].date);
          }
        }
      }
      console.log("shows in fetch", shows);
      createSelectShowsDropDown(shows);
    });
}

function getMovie() {
  let movieSelect = document.querySelector("#film-titles");
  let movie = movieSelect.options[movieSelect.selectedIndex].value;
  return movie;
}

function createSelectShowsDropDown(shows) {
  let select = document.createElement("select");
  select.name = "shows";
  select.id = "shows";
  for (const val of shows) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  let defaultOption = getDefaultOption(select, "Välj en show");
  select.appendChild(defaultOption);
  var label = document.createElement("label");
  label.innerHTML = "Välj show: ";
  label.htmlFor = "shows";
  document
    .getElementById("containerForShows")
    .appendChild(label)
    .appendChild(select);
}

function viewNumberOfTicketsInput(event) {
  event.preventDefault();
  document.querySelector("#amount-tickets-label").style.display = "block";
  document.querySelector("#amount-tickets").style.display = "block";
  document.querySelector("#get-tickets-button").style.display = "block";
}

function showOrder(event) {
  event.preventDefault();
  let title = document.querySelector("#film-titles").value;
  let showtime = document.querySelector("#shows").value;
  let amoutOfTickets = document.querySelector("#amount-tickets").value;

  sessionStorage.setItem("title", title);
  sessionStorage.setItem("showtime", showtime);
  sessionStorage.setItem("amoutOfTickets", amoutOfTickets);

  window.location.replace("../ticketconfirmation.html");
}

elAcceptTermsButton.addEventListener("click", showMovies);
elMovieContainer.addEventListener("change", createSelectShow);
elShowsContainer.addEventListener("change", viewNumberOfTicketsInput);
elTicketForm.addEventListener("submit", showOrder);

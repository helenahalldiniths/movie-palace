let movies = [
  "Elvis",
  "Beast",
  "After ever happy",
  "Där kräftorna sjunger",
  "Downton Abbey:En ny era",
];

function showMovies(event) {
  event.preventDefault();
  let age = retrieveAgeLimit();
  console.log(age);
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

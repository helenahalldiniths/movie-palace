const elForm = document.querySelector("#age-limit-form");

function store(event) {
  event.preventDefault();
  let limit = document.querySelector("#age-limit").value;
  console.log(limit);
  localStorage.setItem("age-limit", limit); // Store
}

elForm.addEventListener("submit", store);

elOutput = document.querySelector("#ticket-confirmation-output");

if (sessionStorage.getItem("title")) {
  let title = sessionStorage.getItem("title");
  let showtime = sessionStorage.getItem("showtime");
  let amoutOfTickets = sessionStorage.getItem("amoutOfTickets");

  elOutput.textContent = `Du har köpt ${amoutOfTickets} biljetter till filmen "${title}" med visningstid ${showtime}`;
}

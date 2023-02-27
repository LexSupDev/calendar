import { eventsDateElem, renderEvents } from "./events.js";

const calendarElem = document.querySelector("#calendar");
let currentDate = new Date();
let mon = 1;
let d = new Date(2023, mon);
let table =
  "<table class='calendar__table table table-bordered'><thead><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";

for (let i = 1; i < d.getDay(); i++) {
  table += "<td></td>";
}

while (d.getMonth() == mon) {
  table += "<td>" + d.getDate() + "</td>";
  // Лучше всегда сравнивать через ===
  if (d.getDay() % 7 == 0) {
    table += "</tr><tr>";
  }
  d.setDate(d.getDate() + 1);
}

if (d.getDay() != 0) {
  for (let i = d.getDay(); i <= 7; i++) {
    table += "<td></td>";
  }
}
table += "</tr></table>";

calendarElem.innerHTML = table;

// Лучше никогда взаимодействие в JS не завязывать на классы, которые используются для стилизации
// Если кто-то поменяет класс, то календарь перестанет работать абсолютно неожиданно
// Лучше завести отдельный класс, например .JS-calendar
const calendarTable = document.querySelector(".calendar__table");

calendarTable.addEventListener("click", (e) => {
  if (Number(e.target.textContent)) {
    currentDate.setDate(e.target.textContent);
    eventsDateElem.innerHTML = currentDate.toLocaleString("ru-ru", {
      month: "long",
      day: "numeric",
    });
  }
  renderEvents(currentDate);
});

export {currentDate};

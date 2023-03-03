import {showActiveDate, showEvents} from "./events.js";

function renderCalendar (eventListObj, activeDate) {
  function getCalendar () {
    const calendarElem = document.querySelector("#calendar");
    let runtimeActiveDate = new Date((new Date().getFullYear()), new Date().getMonth());
    const day = activeDate.getDate();
    const month = runtimeActiveDate.getMonth();

    let table = "<table class='calendar__table table table-bordered JS-calendar'><thead><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";

    for (let i = 1; i < runtimeActiveDate.getDay(); i++) {
      table += "<td></td>";
    }

    while (runtimeActiveDate.getMonth() === month) {

      if (hasEvents(runtimeActiveDate, eventListObj) && runtimeActiveDate.getDate() === day) {
        table += "<td class='table-active has-event'>" + runtimeActiveDate.getDate() + "</td>";
      } else if (runtimeActiveDate.getDate() === day) {
        table += "<td class='table-active'>" + runtimeActiveDate.getDate() + "</td>";
      } else if (hasEvents(runtimeActiveDate, eventListObj)) {
        table += "<td class='has-event'>" + runtimeActiveDate.getDate() + "</td>";
      } else {
        table += "<td>" + runtimeActiveDate.getDate() + "</td>";
      }

      if (runtimeActiveDate.getDay() % 7 === 0) {
        table += "</tr><tr>";
      }
      runtimeActiveDate.setDate(runtimeActiveDate.getDate() + 1);
    }

    if (runtimeActiveDate.getDay() !== 0) {
      for (let i = runtimeActiveDate.getDay(); i <= 7; i++) {
        table += "<td></td>";
      }
    }

    table += "</tr></table>";
    calendarElem.innerHTML = table;
  }

  function hasEvents (checkingDate, eventListObj) {
    let DayEvents = eventListObj.Events.filter(item =>
      new Date(item.date).getDate() === checkingDate.getDate() &&
      new Date(item.date).getMonth() === checkingDate.getMonth() &&
      new Date(item.date).getFullYear() === checkingDate.getFullYear()
    );

    return !!DayEvents.length;
  }

  function handlerDateChange (e) {
    const arrDates = e.currentTarget.querySelectorAll('td');
    const activeDay = e.target.textContent;
    activeDate = new Date((new Date()).setDate(activeDay)); //Преобразование числа(активного дня) в полноценную дату.

    arrDates.forEach(item => item.classList.remove('table-active'));
    if (activeDay && e.target.tagName === 'TD') {
      e.target.classList.add('table-active');
    }
    showActiveDate(activeDate);
    showEvents(eventListObj, activeDate);
  }

  getCalendar();

  const calendarTable = document.querySelector(".JS-calendar");
  calendarTable.addEventListener('click', handlerDateChange);
}

export {renderCalendar};
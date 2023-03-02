import "./scss/style.scss";
import "./js/calendar";
import "./js/filter";
import "./js/events";

import {readLocalStorage, setLocalStorage, showActiveDate, showEvents, addEventAddHandler} from "./js/events.js";
import {renderCalendar} from "./js/calendar.js";
import {addFilterHandler, setFiltersData} from "./js/filter.js";

function init () {
  let eventListObj = readLocalStorage();
  let activeDate = new Date();
  renderCalendar(eventListObj, activeDate);
  showActiveDate(activeDate);
  showEvents(eventListObj, activeDate);
  addFilterHandler(eventListObj, activeDate);
  setFiltersData(eventListObj);
  addEventAddHandler(eventListObj, activeDate);
  addFilterHandler(eventListObj, activeDate);
  setLocalStorage(eventListObj);
}

init();
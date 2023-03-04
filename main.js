import "./scss/style.scss";
import "./js/calendar";
import "./js/filter";
import "./js/events";

import {readLocalStorage, setLocalStorage, showActiveDate, showEvents, addEvent, addPopup} from "./js/events.js";
import {calendar} from "./js/calendar.js";
import {addFilterHandler, setFiltersData} from "./js/filter.js";

function init () {
  let eventListObj = readLocalStorage();
  calendar.activeDate = new Date();
  calendar(eventListObj, calendar.activeDate);
  showActiveDate(calendar.activeDate);
  showEvents(eventListObj, calendar.activeDate);
  addFilterHandler(eventListObj, calendar.activeDate);
  addPopup();
  addEvent(eventListObj);
  setLocalStorage(eventListObj);
}

init();
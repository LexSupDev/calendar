import "./scss/style.scss";
import "./js/calendar";
import "./js/filter";
import "./js/events";

import {readLocalStorage, setLocalStorage, showActiveDate, showEvents, addEvent, addPopup} from "./js/events.js";
import {calendar} from "./js/calendar.js";
import {addFilterHandler, updateFiltersData} from "./js/filter.js";

function init () {
  let eventListObj = readLocalStorage();
  calendar.activeDate = new Date();
  calendar(eventListObj, calendar.activeDate);
  addFilterHandler(eventListObj, calendar.activeDate);
  addPopup();
  addEvent(eventListObj);
  updateFiltersData(eventListObj);
  showEvents(eventListObj, calendar.activeDate);
  showActiveDate(calendar.activeDate);
  setLocalStorage(eventListObj);
}

init();
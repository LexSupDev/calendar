import {showEvents} from "./events.js";
import {calendar} from "./calendar.js";

function updateFiltersData (eventListObj) {
  const filterStartTimeElem = document.querySelector('#filterStartTime');
  const filterDurationElem = document.querySelector('#filterDuration');
  const filterLocationElem = document.querySelector('#filterLocation');
  const filterParticipantsElem = document.querySelector('#filterParticipants');

  filterStartTimeElem.innerHTML = "<option value=\"\" class=\"startTime__listItem\">Все</option>";
  filterDurationElem.innerHTML = "<option value=\"\" class=\"duration__listItem\">Все</option>";
  filterLocationElem.innerHTML = "<option value=\"\" class=\"location__listItem\">Все</option>";
  filterParticipantsElem.innerHTML = "<option value=\"\" class=\"participant__listItem\">Все</option>";

  let startTimeSet = new Set;
  let durationSet = new Set;
  let locationSet = new Set;
  let participantSet = new Set;

  eventListObj.Events.forEach(item => {
    startTimeSet.add(item.startTime);
    durationSet.add(item.duration);
    locationSet.add(item.location);
    participantSet.add(item.participants.join(','));
  });

  function setFilterData(arr, filterElem, selector) {
    Array.from(arr).sort((a, b) => a - b).forEach(item => {
      let elem = `<option value="${item}" class=${selector}>${item}</option>`;
      filterElem.innerHTML += elem;
    });
  }

  setFilterData(startTimeSet, filterStartTimeElem, "startTime__listItem");
  setFilterData(durationSet, filterDurationElem, "duration__listItem");
  setFilterData(locationSet, filterLocationElem, "location__listItem");
  setFilterData(participantSet, filterParticipantsElem, "participants__listItem");

}

function filterEvents (eventListObj) {

  const filterStartTimeElem = document.querySelector('#filterStartTime');
  const filterDurationElem = document.querySelector('#filterDuration');
  const filterLocationElem = document.querySelector('#filterLocation');
  const filterParticipantsElem = document.querySelector('#filterParticipants');

  const startTimeFilter = makeFilter(filterStartTimeElem, "startTime");
  const durationFilter = makeFilter(filterDurationElem, "duration");
  const participantsFilter = makeFilter(filterParticipantsElem, "participants");
  const locationFilter = makeFilter(filterLocationElem, "location");

  function makeFilter (elem, param) {
    return function (item) {
      if (elem.value) {
        if (typeof item[param] === 'object') {
          return item[param].join(',') === elem.value;
        } else {
          return item[param] === elem.value;
        }
      } else {
        return true;
      }
    }
  }
  function filterEventList() {
    return {
      Events: eventListObj.Events.slice(0)
        .filter(startTimeFilter)
        .filter(durationFilter)
        .filter(locationFilter)
        .filter(participantsFilter),
    };
  }

  let filteredEventList = filterEventList();
  return filteredEventList.Events;
}

function addFilterHandler (eventListObj) {
  const filterWrapper = document.querySelector('.filters__wrapper');
  filterWrapper.addEventListener('change', () => {showEvents(eventListObj, calendar.activeDate)});
}

export {addFilterHandler, updateFiltersData, filterEvents};
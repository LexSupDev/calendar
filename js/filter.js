import {showEvents} from "./events.js";

function setFiltersData (eventListObj) {
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

  const filterStartTimeElem = document.querySelector('#filterStartTime');
  const filterDurationElem = document.querySelector('#filterDuration');
  const filterLocationElem = document.querySelector('#filterLocation');
  const filterParticipantsElem = document.querySelector('#filterParticipants');

  filterStartTimeElem.innerHTML = "<option value=\"\" class=\"startTime__listItem\">Все</option>";
  filterDurationElem.innerHTML = "<option value=\"\" class=\"duration__listItem\">Все</option>";
  filterLocationElem.innerHTML = "<option value=\"\" class=\"location__listItem\">Все</option>";
  filterParticipantsElem.innerHTML = "<option value=\"\" class=\"participant__listItem\">Все</option>";

  startTimeSet.forEach(item => {
    let startTimeElem = `<option value="${item}" class="startTime__listItem">${item}</option>`;
    filterStartTimeElem.innerHTML += startTimeElem;
  });

  Array.from(durationSet).sort( (a,b) => a - b).forEach(item => {
    let durationElem = `<option value="${item}" class="duration__listItem">${item}</option>`;
    filterDurationElem.innerHTML += durationElem;
  });
  locationSet.forEach(item => {
    let locationElem = `<option value="${item}" class="location__listItem">${item}</option>`;
    filterLocationElem.innerHTML += locationElem;
  });
  participantSet.forEach(item => {
    let participantsElem = `<option value="${item}" class="participants__listItem">${item}</option>`;
    filterParticipantsElem.innerHTML += participantsElem;
  });
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
  let filteredEventList = filterEventList();

  function filterEventList() {
    return {
      Events: eventListObj.Events.slice(0)
        .filter(startTimeFilter)
        .filter(durationFilter)
        .filter(locationFilter)
        .filter(participantsFilter),
    };
  }

  return filteredEventList.Events;
}

function addFilterHandler (eventListObj, activeDate) {
  const filterWrapper = document.querySelector('.filters__wrapper');
  filterWrapper.addEventListener('change', () => {showEvents(eventListObj, activeDate)});
}

export {addFilterHandler, setFiltersData, filterEvents}
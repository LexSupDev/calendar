import { renderEvents } from "./events.js";
import { currentDate } from "./calendar.js";

const filterWrapper = document.querySelector('.filters__wrapper');

const filterStartTimeElem = document.querySelector('#filterStartTime');
const filterDurationElem = document.querySelector('#filterDuration');
const filterLocationElem = document.querySelector('#filterLocation');
const filterParticipantsElem = document.querySelector('#filterParticipants');

filterWrapper.addEventListener('change', () => {renderEvents(currentDate)});

function filterEventList(eventListObj) {
  let filteredEventList = {
    Events: []
  }

  filteredEventList.Events = eventListObj.Events.filter( item => {
    return item.startTime === filterStartTimeElem.value &&
           item.duration === filterDurationElem.value &&
           item.location === filterLocationElem.value &&
           item.participants.join(',') === filterParticipantsElem.value;
  })

  return filteredEventList;
}

export {filterEventList};
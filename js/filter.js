// import { renderEvents } from "./events.js";
// import { currentDate } from "./calendar.js";
//
// const filterWrapper = document.querySelector('.filters__wrapper');
// const filterStartTimeElem = document.querySelector('#filterStartTime');
// const filterDurationElem = document.querySelector('#filterDuration');
// const filterLocationElem = document.querySelector('#filterLocation');
// const filterParticipantsElem = document.querySelector('#filterParticipants');
//
//
// filterWrapper.addEventListener('change', () => {renderEvents(currentDate)});
//
// function filterEventList(eventListObj) {
//   let filteredEventList = {
//     Events: []
//   }
//
//   filteredEventList.Events = eventListObj.Events.slice(0);
//
//   filteredEventList.Events = filteredEventList.Events.filter( item => {
//     if (filterStartTimeElem.value) {
//       return item.startTime === filterStartTimeElem.value;
//     } else {
//       return true;
//     }
//   });
//   filteredEventList.Events = filteredEventList.Events.filter( item => {
//     if (filterDurationElem.value) {
//       return item.duration === filterDurationElem.value;
//     } else {
//       return true;
//     }
//   });
//   filteredEventList.Events = filteredEventList.Events.filter( item => {
//     if (filterLocationElem.value) {
//       return item.location === filterLocationElem.value;
//     } else {
//       return true;
//     }
//   });
//   filteredEventList.Events = filteredEventList.Events.filter( item => {
//     if (filterParticipantsElem.value) {
//       return item.participants.join(',') === filterParticipantsElem.value;
//     } else {
//       return true;
//     }
//   });
//
//   return filteredEventList;
// }
//
// export {filterEventList};
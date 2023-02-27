import { renderEvents } from "./events.js";
import { currentDate } from "./calendar.js";

const filterWrapper = document.querySelector('.filters__wrapper');

// Было бы круто разделить работу с DOM и логику применения фильтров
// Тогда из этого модуля можно было бы экспортировать функции, которые создают и применяют фильтры
// А вызывать их уже в другом файле
//
const filterStartTimeElem = document.querySelector('#filterStartTime');
const filterDurationElem = document.querySelector('#filterDuration');
const filterLocationElem = document.querySelector('#filterLocation');
const filterParticipantsElem = document.querySelector('#filterParticipants');

filterWrapper.addEventListener('change', () => {renderEvents(currentDate)});

// Было бы круто упростить функцию filterEventList,
// попробуй написать функцию makeFilter, которая будет создавать функцию-фильтр в зависимости от аргументов
// Чтобы можно было написать вот так:
//
// const startTimeFilter = makeFilter(filterStartTimeElem, "startTime");
// const durationFilter = makeFilter(filterDurationElem, "duration");
// const participantsFilter = makeFilter(filterParticipantsElem, "participants");
// const locationFilter = makeFilter(filterLocationElem, "location");

// function filterEventList(eventListObj) {
//   return {
//     Events: eventListObj.Events.slice(0)
//       .filter(startTimeFilter)
//       .filter(durationFilter)
//       .filter(participantsFilter)
//       .filter(locationFilter),
//   };
// }
//
function filterEventList(eventListObj) {
  let filteredEventList = {
    Events: []
  }

  filteredEventList.Events = eventListObj.Events.slice(0);

  // Можно все фильтры применить друг за другом последовательно
  // filteredEventList.Events.filter().filter()
  filteredEventList.Events = filteredEventList.Events.filter( item => {
    if (filterStartTimeElem.value) {
      return item.startTime === filterStartTimeElem.value;
    } else {
      return true;
    }
  });
  filteredEventList.Events = filteredEventList.Events.filter( item => {
    if (filterDurationElem.value) {
      return item.duration === filterDurationElem.value;
    } else {
      return true;
    }
  });
  filteredEventList.Events = filteredEventList.Events.filter( item => {
    if (filterLocationElem.value) {
      return item.location === filterLocationElem.value;
    } else {
      return true;
    }
  });
  filteredEventList.Events = filteredEventList.Events.filter( item => {
    if (filterParticipantsElem.value) {
      return item.participants.join(',') === filterParticipantsElem.value;
    } else {
      return true;
    }
  });

  // Лучше не оставлять коментариев, которые не поясняют код
  // Если хочется что-то сохранить, то можно закоммитить это в git, а потом найти в истории
  //
  // filteredEventList.Events = eventListObj.Events.filter( item => {
  //   return item.startTime === filterStartTimeElem.value &&
  //          item.duration === filterDurationElem.value &&
  //          item.location === filterLocationElem.value &&
  //          item.participants.join(',') === filterParticipantsElem.value;
  // })

  return filteredEventList;
}

export {filterEventList};

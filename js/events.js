import {filterEvents , updateFiltersData} from "./filter.js";
import {calendar} from "./calendar.js";

function readLocalStorage () {
  if (localStorage.getItem('eventsList')) {
    return JSON.parse(localStorage.getItem('eventsList'));
  } else {
    return {
      Events: [
        {
          title: "Соревнование по лёгкой атлетике",
          date: "2023-03-15",
          startTime: "14:30",
          duration: "4",
          location: "Бауманская",
          participants: ["Тренер", "Мартышка"],
        },
        {
          title: "Воллейбол",
          date: "2023-03-16",
          startTime: "12:30",
          duration: "1",
          location: "Сокольники",
          participants: ["Саня", "Яна"],
        },
      ],
    };
  }
}

function setLocalStorage (eventListObj) {
  localStorage.setItem("eventsList", JSON.stringify(eventListObj));
}

function showActiveDate (activeDate) {
  const eventsDateElem = document.querySelector(".events__date");
  eventsDateElem.innerHTML = activeDate.toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function showEvents (eventListObj, activeDate) {
  let filteredList = filterEvents(eventListObj);

  function filterOnDate (listObj, date) {
    let filterOnDateListObj = {
      Events: []
    }

    listObj.forEach(item => {
      let itemDate = new Date(item['date']);

      if (date.getDate() === itemDate.getDate()
        && date.getMonth() === itemDate.getMonth()
        && date.getFullYear() === itemDate.getFullYear()) {
        filterOnDateListObj.Events.push(item);
      }
    });
    return filterOnDateListObj;
  }

  let onDateEventListObj = filterOnDate(filteredList, activeDate);

  const eventsElem = document.querySelector(".events__list");
  eventsElem.innerHTML = '';

  //Отрисовка собыйти на страницу
  onDateEventListObj.Events.forEach((item) => {
    let event = `<article class="events_listItem eventItem"><div class="eventItem__controlBlock"><span class="eventItem__controlItem btn btn--save collapse"></span><span class="eventItem__controlItem btn btn--edit"></span>
      <span class="eventItem__controlItem btn btn--del"></span>
      </div>
    <p class="eventItem__title">${item.title}</p>                                                             
    <div class="eventItem__row">                                                                                                
    <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${item.startTime}</span></span>                      
    <span class="eventItem__duration">\\ Длительность: <span class="eventItem__durationSpan">${item.duration}</span></span>              
    </div>                                                                                                                      
    <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${item.location}</span></p>                               
    <p class="eventItem__participants">Участники: 
    <span class="eventItem__participantsSpan">${item.participants.join(",")}</span></p></article>`;
    eventsElem.innerHTML += event;
  });

  updateFiltersData(filterOnDate(eventListObj.Events, activeDate));
  addButtonsHandler(onDateEventListObj, eventListObj, activeDate);
}

function addButtonsHandler (onDateEventListObj, eventListObj, activeDate) {
  const editButtons = document.querySelectorAll('.btn--edit');
  const delButtons = document.querySelectorAll('.btn--del');
  const saveButtons = document.querySelectorAll('.btn--save');

  delButtons.forEach( (item, index) => {
    item.addEventListener('click', () => {
      let j = 0;
      eventListObj.Events.forEach((eventListItem, i) => {
        if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
          while (j < 1) {
            j++;
            console.log('Удалил')
            eventListObj.Events.splice(i, 1);
            setLocalStorage(eventListObj);
            updateFiltersData(eventListObj);
            calendar(eventListObj, activeDate);
            showEvents(eventListObj, activeDate);
          }
        }
      });
    });
  });

  editButtons.forEach((item, index) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      item.classList.add('collapse');
      saveButtons[index].classList.remove('collapse');
      let currentElem = e.target.parentElement.parentElement,
        currentEventTitleElem = currentElem.querySelector('.eventItem__title'),
        currentEventStartTimeElem = currentElem.querySelector('.eventItem__startTimeSpan'),
        currentEventDurationElem = currentElem.querySelector('.eventItem__durationSpan'),
        currentEventLocationElem = currentElem.querySelector('.eventItem__locationSpan'),
        currentEventParticipantsElem = currentElem.querySelector('.eventItem__participantsSpan');

      currentEventTitleElem.innerHTML = `<input type="text" value="${currentEventTitleElem.textContent}">`;
      currentEventStartTimeElem.innerHTML = `<input type="time" value="${currentEventStartTimeElem.textContent}">`;
      currentEventDurationElem.innerHTML = `<input type="text" value="${currentEventDurationElem.textContent}">`;
      currentEventLocationElem.innerHTML = `<input type="text" value="${currentEventLocationElem.textContent}">`;
      currentEventParticipantsElem.innerHTML = `<input type="text" value="${currentEventParticipantsElem.textContent}">`;

      saveButtons[index].addEventListener('click', (e) => {
        e.preventDefault();
        let j = 0;
        eventListObj.Events.forEach((eventListItem, i) => {
          if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
            while (j < 1) {
              j++;
              eventListObj.Events[i].title = currentEventTitleElem.children[0].value;
              eventListObj.Events[i].startTime = currentEventStartTimeElem.children[0].value;
              eventListObj.Events[i].duration = currentEventDurationElem.children[0].value;
              eventListObj.Events[i].location = currentEventLocationElem.children[0].value;
              eventListObj.Events[i].participants = currentEventParticipantsElem.children[0].value.split(',');
              setLocalStorage(eventListObj);
              updateFiltersData(eventListObj);
              calendar(eventListObj, activeDate);
              showEvents(eventListObj, activeDate);
            }
          }
        });
      });
    });
  });
}

function addPopup () {
  function handlerAddPopup () {

    const newEventPopupElem = document.querySelector(".events__addPopup");

    if (newEventPopupElem.classList.contains('collapse')) {
      newEventPopupElem.classList.remove("collapse");
    } else {
      newEventPopupElem.classList.add("collapse");
    }

  }

  const newEventButtonElem = document.querySelector('.events__addButton');
  newEventButtonElem.addEventListener("click", handlerAddPopup);
}

function setNewEvent (eventListObj) {
  const eventTitleElem = document.querySelector('#event-title');
  const eventDateElem = document.querySelector('#event-date');
  const eventStartTimeElem = document.querySelector('#event-startTime');
  const eventDurationElem = document.querySelector('#event-duration');
  const eventLocationElem = document.querySelector('#event-location');
  const eventParticipantsElem = document.querySelector('#event-participants');

  eventListObj.Events.push({
    title: eventTitleElem.value,
    date: eventDateElem.value,
    startTime: eventStartTimeElem.value,
    duration: eventDurationElem.value,
    location: eventLocationElem.value,
    participants: eventParticipantsElem.value.split(','),
  });
}

function addEvent (eventListObj) {
  function handlerAddEvent (e, eventListObj, activeDate) {
    e.preventDefault();
    setNewEvent(eventListObj);
    setLocalStorage(eventListObj);
    updateFiltersData(eventListObj);
    calendar(eventListObj, activeDate);
    showEvents(eventListObj, activeDate);
  }

  const eventAddPopupFormElem = document.querySelector(".addEventPopup__form");
  eventAddPopupFormElem.addEventListener("submit", (e) => {handlerAddEvent(e, eventListObj, calendar.activeDate)});
}

export {readLocalStorage, setLocalStorage, showActiveDate, showEvents, addEvent, addPopup};
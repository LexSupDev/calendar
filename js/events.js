import {filterEvents , setFiltersData} from "./filter.js";
import {renderCalendar} from "./calendar.js";

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
  eventsDateElem.innerHTML = activeDate.toLocaleString("ru-ru", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function showEvents (eventListObj, activeDate) {
  let filteredList = filterEvents(eventListObj);
  let onDateEventListObj = {
    Events: []
  };

  filteredList.forEach(item => {
    let itemDate = new Date(item['date']);
    if (activeDate.getDate() === itemDate.getDate()
      && activeDate.getMonth() === itemDate.getMonth()
      && activeDate.getFullYear() === itemDate.getFullYear()) {
      onDateEventListObj.Events.push(item);
    }
  });

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

  addButtonsHandler(onDateEventListObj, eventListObj, activeDate);
  addEventAddHandler(eventListObj, activeDate);
}

function addButtonsHandler (onDateEventListObj, eventListObj, activeDate) {
  const editButtons = document.querySelectorAll('.btn--edit');
  const delButtons = document.querySelectorAll('.btn--del');
  const saveButtons = document.querySelectorAll('.btn--save');

  delButtons.forEach( (item, index) => {
    item.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      eventListObj.Events.forEach((eventListItem, i) => {
        if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
          eventListObj.Events.splice(i, 1);
          setLocalStorage(eventListObj);
          setFiltersData(eventListObj);
          renderCalendar(eventListObj, activeDate);
          showEvents(eventListObj, activeDate);
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
        eventListObj.Events.forEach((eventListItem, i) => {
          if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
            eventListObj.Events[i].title = currentEventTitleElem.children[0].value;
            eventListObj.Events[i].startTime = currentEventStartTimeElem.children[0].value;
            eventListObj.Events[i].duration = currentEventDurationElem.children[0].value;
            eventListObj.Events[i].location = currentEventLocationElem.children[0].value;
            eventListObj.Events[i].participants = currentEventParticipantsElem.children[0].value.split(',');
            setLocalStorage(eventListObj);
            setFiltersData(eventListObj);
            renderCalendar(eventListObj, activeDate);
            showEvents(eventListObj, activeDate);
          }
        });
      });
    });
  });
}

function addEventAddHandler (eventListObj, activeDate) {

  const eventAddButtonElem = document.querySelector(".events__addButton");
  const eventAddPopupElem = document.querySelector(".events__addPopup");

  eventAddButtonElem.removeEventListener("click", () => {
    console.log('remove')
  });

  eventAddButtonElem.addEventListener("click", () => {
    if (eventAddPopupElem.classList.contains('collapse')) {
      eventAddPopupElem.classList.remove("collapse");
    } else {
      eventAddPopupElem.classList.add("collapse");
    }
    console.log('add')
    console.log(activeDate)
  });

  //Добавление нового события
  const eventAddPopupFormElem = document.querySelector(".addEventPopup__form");

  eventAddPopupFormElem.addEventListener("submit", e => {
    const eventTitleElem = document.querySelector('#event-title');
    const eventDateElem = document.querySelector('#event-date');
    const eventStartTimeElem = document.querySelector('#event-startTime');
    const eventDurationElem = document.querySelector('#event-duration');
    const eventLocationElem = document.querySelector('#event-location');
    const eventParticipantsElem = document.querySelector('#event-participants');
    e.preventDefault();

    eventListObj.Events.push({
      title: eventTitleElem.value,
      date: eventDateElem.value,
      startTime: eventStartTimeElem.value,
      duration: eventDurationElem.value,
      location: eventLocationElem.value,
      participants: eventParticipantsElem.value.split(','),
    });
    setLocalStorage(eventListObj);
    setFiltersData(eventListObj);
    renderCalendar(eventListObj, activeDate);
    showEvents(eventListObj, activeDate);
  });
}

export {readLocalStorage, setLocalStorage, showActiveDate, showEvents, addEventAddHandler};
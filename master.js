let eventListObj = {};
let activeDate = new Date();

function init () {
  readLocalStorage();
  renderCalendar();
  showActiveDate();
  showEvents();
  addFilterHandler();
  setFiltersData();
  addEventAddHandler();
}

function setFiltersData () {
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

function filterEvents () {
  const filterStartTimeElem = document.querySelector('#filterStartTime');
  const filterDurationElem = document.querySelector('#filterDuration');
  const filterLocationElem = document.querySelector('#filterLocation');
  const filterParticipantsElem = document.querySelector('#filterParticipants');

  let filteredEventList = {
    Events: []
  }

  filteredEventList.Events = eventListObj.Events.slice(0);

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

  return filteredEventList.Events;
}

function showActiveDate () {
    const eventsDateElem = document.querySelector(".events__date");
    eventsDateElem.innerHTML = activeDate.toLocaleString("ru-ru", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
}

function readLocalStorage () {
  if (localStorage.getItem('eventsList')) {
    eventListObj = JSON.parse(localStorage.getItem('eventsList'));
  } else {
    eventListObj = {
      Events: [
        {
          title: "Соревнование по лёгкой атлетике",
          date: "2023-02-15",
          startTime: "14:30",
          duration: "4",
          location: "Бауманская",
          participants: ["Тренер", "Мартышка"],
        },
        {
          title: "Воллейбол",
          date: "2023-02-16",
          startTime: "12:30",
          duration: "1",
          location: "Сокольники",
          participants: ["Саня", "Яна"],
        },
      ],
    };
  }
}

function setLocalStorage () {
  localStorage.setItem("eventsList", JSON.stringify(eventListObj));
}

function showEvents () {
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

  addButtonsHandler(onDateEventListObj)
}

function addButtonsHandler (onDateEventListObj) {
  const editButtons = document.querySelectorAll('.btn--edit');
  const delButtons = document.querySelectorAll('.btn--del');
  const saveButtons = document.querySelectorAll('.btn--save');

  delButtons.forEach( (item, index) => {
    item.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      eventListObj.Events.forEach((eventListItem, i) => {
        if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
          eventListObj.Events.splice(i, 1);
          setLocalStorage();
          setFiltersData();
          showEvents();
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
            setLocalStorage();
            setFiltersData();
            showEvents();
          }
        });
      });
    });
  });
}

function addFilterHandler () {
  function addFilterHandler () {
    const filterWrapper = document.querySelector('.filters__wrapper');
    filterWrapper.addEventListener('change', () => {showEvents()});
  }
  addFilterHandler();
}

function addEventAddHandler () {
  const eventAddButtonElem = document.querySelector(".events__addButton");
  const eventAddPopupElem = document.querySelector(".events__addPopup");

  eventAddButtonElem.addEventListener("click", () => {
    eventAddPopupElem.classList.toggle("collapse");
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
    setLocalStorage();
    setFiltersData();
    showEvents();
  });
}

function renderCalendar () {
  function getCalendar () {
    const calendarElem = document.querySelector("#calendar");
    let runtimeActiveDate = new Date((new Date().getFullYear()), new Date().getMonth());
    const day = new Date().getDate();
    const month = runtimeActiveDate.getMonth();

    let table = "<table class='calendar__table table table-bordered JS-calendar'><thead><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";

    for (let i = 1; i < runtimeActiveDate.getDay(); i++) {
      table += "<td></td>";
    }

    while (runtimeActiveDate.getMonth() === month) {
      if (runtimeActiveDate.getDate() === day) {
        table += "<td class='table-active'>" + runtimeActiveDate.getDate() + "</td>";
      } else {
        table += "<td>" + runtimeActiveDate.getDate() + "</td>";
      }
      if (runtimeActiveDate.getDay() % 7 === 0) {
        table += "</tr><tr>";
      }
      runtimeActiveDate.setDate(runtimeActiveDate.getDate() + 1);
    }

    if (runtimeActiveDate.getDay() !== 0) {
      for (let i = runtimeActiveDate.getDay(); i <= 7; i++) {
        table += "<td></td>";
      }
    }

    table += "</tr></table>";
    calendarElem.innerHTML = table;
  }

  function handlerDateChange (e) {
    const arrDates = e.currentTarget.querySelectorAll('td');
    const activeDay = e.target.textContent;
    activeDate = new Date((new Date()).setDate(activeDay)); //Преобразование числа(активного дня) в полноценную дату.

    arrDates.forEach(item => item.classList.remove('table-active'));

    if (activeDay && e.target.tagName === 'TD') {
      e.target.classList.add('table-active');
    }
    console.log(activeDate)
    showActiveDate(activeDate);
    showEvents();
  }

  getCalendar();

  const calendarTable = document.querySelector(".JS-calendar");
  calendarTable.addEventListener('click', handlerDateChange);
}

init();
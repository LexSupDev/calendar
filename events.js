
const eventsDateElem = document.querySelector(".events__date");
const eventAddButtonElem = document.querySelector(".events__addButton");
const eventAddPopupElem = document.querySelector(".events__addPopup");
let eventListObj = {};

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
let currentDate = new Date();
let activeDate;


function renderEvents(eventsOnDate) {
  activeDate = eventsOnDate;
  let onDateEventListObj = {
    Events: []
  };

  eventListObj.Events.map(item => {
    let itemDate = new Date(item['date']);

    if (eventsOnDate.getDate() === itemDate.getDate()
        && eventsOnDate.getMonth() === itemDate.getMonth()
        && eventsOnDate.getFullYear() === itemDate.getFullYear()) {
      onDateEventListObj.Events.push(item);
    }
  });

  const eventsElem = document.querySelector(".events__list");
  eventsElem.innerHTML = '';

  onDateEventListObj.Events.forEach((item) => {
    let event = document.createElement("article");
    event.classList.add("events_listItem", "eventItem");
    event.innerHTML = `<div class="eventItem__controlBlock"><span class="eventItem__controlItem button button--edit"></span>
        <span class="eventItem__controlItem button button--del"></span>
        </div>
      <p class="eventItem__title">${item.title}</p>                                                             
      <div class="eventItem__row">                                                                                                
      <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${item.startTime}</span></span>                      
      <span class="eventItem__duration">\ Длительность: <span class="eventItem__durationSpan">${item.duration}</span></span>              
      </div>                                                                                                                      
      <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${item.location}</span></p>                               
      <p class="eventItem__participants">Участники: 
      <span class="eventItem__participantsSpan">${item.participants.join(",")}</span></p>`;
    eventsElem.appendChild(event);
  });

  //const editButton = event.querySelector('.button--edit');
  const delButton = document.querySelectorAll('.button--del');

  delButton.forEach( (item, index) => {
    item.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      eventListObj.Events.forEach((eventListItem, i) => {
        if (JSON.stringify(eventListItem) === JSON.stringify(onDateEventListObj.Events[index])) {
          eventListObj.Events.splice(i, 1);
          console.log(eventListObj.Events);
          renderEvents(activeDate);
        }
      })
    });
  })


  localStorage.setItem("eventsList", JSON.stringify(eventListObj));
}
renderEvents(currentDate);



eventsDateElem.innerHTML = currentDate.toLocaleString("ru-ru", {
  month: "long",
  day: "numeric",
});

eventAddButtonElem.addEventListener("click", () => {
  eventAddPopupElem.classList.toggle("collapse");
});

const eventAddPopupFormElem = document.querySelector(".addEventPopup__form");

eventAddPopupFormElem.addEventListener("submit", (e) => {
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
  renderEvents(activeDate);

});

export { eventsDateElem, renderEvents };

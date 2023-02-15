const eventsDateElem = document.querySelector(".events__date");
const eventAddButton = document.querySelector(".events__addButton");
const eventAddPopup = document.querySelector(".events__addPopup");
const eventListObj = {
  Events: [
    {
      title: "Соревнование по лёгкой атлетике",
      date: "14.02.2023",
      startTime: "14:30",
      duration: "4",
      location: "Бауманская",
      participants: ["Тренер", "Мартышка"],
    },
    {
      title: "Воллейбол",
      date: "14.02.2023",
      startTime: "12:30",
      duration: "1",
      location: "Сокольники",
      participants: ["Саня", "Яна"],
    },
  ],
};

function renderEvents() {
  const eventsElem = document.querySelector(".events__list");

  for (let i = 0; i < eventListObj.Events.length; i++) {
    let event = document.createElement("article");
    event.classList.add("events_listItem", "eventItem");
    event.innerHTML = `<p class="eventItem__title">${
      eventListObj.Events[i].title
    }</p>                                                             
      <div class="eventItem__row">                                                                                                
      <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${
        eventListObj.Events[i].startTime
      }</span>                      
      <span class="eventItem__duration">\ Длительность: <span class="eventItem__durationSpan">${
        eventListObj.Events[i].duration
      }</span></span>              
      </div>                                                                                                                      
      <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${
        eventListObj.Events[i].location
      }</span></p>                               
      <p class="eventItem__participants">Участники: <span class="eventItem__participantsSpan">${eventListObj.Events[
        i
      ].participants.join(",")}</span></p>`;

    eventsElem.appendChild(event);
  }

  localStorage.setItem("eventsList", JSON.stringify(eventListObj));
}
renderEvents();
const currentDate = new Date();

eventsDateElem.innerHTML = currentDate.toLocaleString("ru-ru", {
  month: "long",
  day: "numeric",
});

eventAddButton.addEventListener("click", () => {
  eventAddPopup.classList.toggle("collapse");
});

export { eventsDateElem };

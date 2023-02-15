(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const u=document.querySelector(".events__date"),_=document.querySelector(".events__addButton"),f=document.querySelector(".events__addPopup");let i={};localStorage.getItem("eventsList")?i=JSON.parse(localStorage.getItem("eventsList")):i={Events:[{title:"Соревнование по лёгкой атлетике",date:"2023-02-15",startTime:"14:30",duration:"4",location:"Бауманская",participants:["Тренер","Мартышка"]},{title:"Воллейбол",date:"2023-02-16",startTime:"12:30",duration:"1",location:"Сокольники",participants:["Саня","Яна"]}]};let m=new Date,v;function d(n){v=n;let t={Events:[]};i.Events.map(a=>{let e=new Date(a.date);n.getDate()===e.getDate()&&n.getMonth()===e.getMonth()&&n.getFullYear()===e.getFullYear()&&t.Events.push(a)});const r=document.querySelector(".events__list");r.innerHTML="";for(let a=0;a<t.Events.length;a++){let e=document.createElement("article");e.classList.add("events_listItem","eventItem"),e.innerHTML=`<div class="eventItem__controlBlock"><span class="eventItem__controlItem eventItem__controlItem--edit"></span>
        <span class="eventItem__controlItem eventItem__controlItem--del"></span>
        </div>
  <p class="eventItem__title">${t.Events[a].title}</p>                                                             
      <div class="eventItem__row">                                                                                                
      <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${t.Events[a].startTime}</span></span>                      
      <span class="eventItem__duration"> Длительность: <span class="eventItem__durationSpan">${t.Events[a].duration}</span></span>              
      </div>                                                                                                                      
      <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${t.Events[a].location}</span></p>                               
      <p class="eventItem__participants">Участники: <span class="eventItem__participantsSpan">${t.Events[a].participants.join(",")}</span></p>`,r.appendChild(e)}localStorage.setItem("eventsList",JSON.stringify(i))}d(m);u.innerHTML=m.toLocaleString("ru-ru",{month:"long",day:"numeric"});_.addEventListener("click",()=>{f.classList.toggle("collapse")});const g=document.querySelector(".addEventPopup__form");g.addEventListener("submit",n=>{const t=document.querySelector("#event-title"),r=document.querySelector("#event-date"),a=document.querySelector("#event-startTime"),e=document.querySelector("#event-duration"),o=document.querySelector("#event-location"),c=document.querySelector("#event-participants");n.preventDefault(),i.Events.push({title:t.value,date:r.value,startTime:a.value,duration:e.value,location:o.value,participants:c.value.split(",")}),d(v)});const h=document.querySelector("#calendar");let p=1,l=new Date(2023,p),s="<table class='calendar__table table table-bordered'><thead class='table-dark'><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";for(let n=1;n<l.getDay();n++)s+="<td></td>";for(;l.getMonth()==p;)s+="<td>"+l.getDate()+"</td>",l.getDay()%7==0&&(s+="</tr><tr>"),l.setDate(l.getDate()+1);if(l.getDay()!=0)for(let n=l.getDay();n<=7;n++)s+="<td></td>";s+="</tr></table>";h.innerHTML=s;const y=document.querySelector(".calendar__table");y.addEventListener("click",n=>{let t=new Date;Number(n.target.textContent)&&(t.setDate(n.target.textContent),u.innerHTML=t.toLocaleString("ru-ru",{month:"long",day:"numeric"})),d(t)});

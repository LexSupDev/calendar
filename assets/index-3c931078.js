(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function d(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=d(n);fetch(n.href,r)}})();const P=document.querySelector(".filters__wrapper"),T=document.querySelector("#filterStartTime");document.querySelector("#filterDuration");document.querySelector("#filterLocation");document.querySelector("#filterParticipants");P.addEventListener("change",()=>{m(_)});function x(e){let t={Events:[]};return t.Events=e.Events.filter(d=>T.value?d.startTime===T.value:!0),t}const I=document.querySelector(".events__date"),O=document.querySelector(".events__addButton"),A=document.querySelector(".events__addPopup");let a={};localStorage.getItem("eventsList")?a=JSON.parse(localStorage.getItem("eventsList")):a={Events:[{title:"Соревнование по лёгкой атлетике",date:"2023-02-15",startTime:"14:30",duration:"4",location:"Бауманская",participants:["Тренер","Мартышка"]},{title:"Воллейбол",date:"2023-02-16",startTime:"12:30",duration:"1",location:"Сокольники",participants:["Саня","Яна"]}]};let q=new Date,f;function m(e=f){f=e;let t={Events:[]};x(a).Events.map(l=>{let o=new Date(l.date);e.getDate()===o.getDate()&&e.getMonth()===o.getMonth()&&e.getFullYear()===o.getFullYear()&&t.Events.push(l)});const c=document.querySelector(".events__list");c.innerHTML="",t.Events.forEach(l=>{let o=`<article class="events_listItem eventItem"><div class="eventItem__controlBlock"><span class="eventItem__controlItem btn btn--save collapse"></span><span class="eventItem__controlItem btn btn--edit"></span>
        <span class="eventItem__controlItem btn btn--del"></span>
        </div>
      <p class="eventItem__title">${l.title}</p>                                                             
      <div class="eventItem__row">                                                                                                
      <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${l.startTime}</span></span>                      
      <span class="eventItem__duration">\\ Длительность: <span class="eventItem__durationSpan">${l.duration}</span></span>              
      </div>                                                                                                                      
      <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${l.location}</span></p>                               
      <p class="eventItem__participants">Участники: 
      <span class="eventItem__participantsSpan">${l.participants.join(",")}</span></p></article>`;c.innerHTML+=o});const n=document.querySelectorAll(".btn--edit"),r=document.querySelectorAll(".btn--del"),i=document.querySelectorAll(".btn--save");r.forEach((l,o)=>{l.addEventListener("click",S=>{S.target.parentElement.parentElement.remove(),a.Events.forEach((u,v)=>{JSON.stringify(u)===JSON.stringify(t.Events[o])&&(a.Events.splice(v,1),m(f))})})}),n.forEach((l,o)=>{l.addEventListener("click",S=>{S.preventDefault(),l.classList.add("collapse"),i[o].classList.remove("collapse");let u=S.target.parentElement.parentElement,v=u.querySelector(".eventItem__title"),y=u.querySelector(".eventItem__startTimeSpan"),h=u.querySelector(".eventItem__durationSpan"),L=u.querySelector(".eventItem__locationSpan"),g=u.querySelector(".eventItem__participantsSpan");v.innerHTML=`<input type="text" value="${v.textContent}">`,y.innerHTML=`<input type="time" value="${y.textContent}">`,h.innerHTML=`<input type="text" value="${h.textContent}">`,L.innerHTML=`<input type="text" value="${L.textContent}">`,g.innerHTML=`<input type="text" value="${g.textContent}">`,i[o].addEventListener("click",N=>{N.preventDefault(),a.Events.forEach((w,E)=>{JSON.stringify(w)===JSON.stringify(t.Events[o])&&(a.Events[E].title=v.children[0].value,a.Events[E].startTime=y.children[0].value,a.Events[E].duration=h.children[0].value,a.Events[E].location=L.children[0].value,a.Events[E].participants=g.children[0].value.split(","),m(f))})})})}),localStorage.setItem("eventsList",JSON.stringify(a))}m(q);I.innerHTML=q.toLocaleString("ru-ru",{month:"long",day:"numeric"});O.addEventListener("click",()=>{A.classList.toggle("collapse")});const k=document.querySelector(".addEventPopup__form");k.addEventListener("submit",e=>{const t=document.querySelector("#event-title"),d=document.querySelector("#event-date"),c=document.querySelector("#event-startTime"),n=document.querySelector("#event-duration"),r=document.querySelector("#event-location"),i=document.querySelector("#event-participants");e.preventDefault(),a.Events.push({title:t.value,date:d.value,startTime:c.value,duration:n.value,location:r.value,participants:i.value.split(",")}),m(f)});let b=new Set,D=new Set,$=new Set,M=new Set;a.Events.map(e=>{b.add(e.startTime),D.add(e.duration),$.add(e.location),M.add(e.participants.join(","))});const C=document.querySelector("#filterStartTime"),B=document.querySelector("#filterDuration"),J=document.querySelector("#filterLocation"),j=document.querySelector("#filterParticipants");b.forEach(e=>{let t=`<option value="${e}" class="startTime__listItem">${e}</option>`;C.innerHTML+=t});Array.from(D).sort((e,t)=>e-t).forEach(e=>{let t=`<option value="${e}" className="duration__listItem">${e}</option>`;B.innerHTML+=t});$.forEach(e=>{let t=`<option value="${e}" className="location__listItem">${e}</option>`;J.innerHTML+=t});M.forEach(e=>{let t=`<option value="${e}" className="participants__listItem">${e}</option>`;j.innerHTML+=t});const F=document.querySelector("#calendar");let _=new Date,H=1,s=new Date(2023,H),p="<table class='calendar__table table table-bordered'><thead class='table-dark'><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";for(let e=1;e<s.getDay();e++)p+="<td></td>";for(;s.getMonth()==H;)p+="<td>"+s.getDate()+"</td>",s.getDay()%7==0&&(p+="</tr><tr>"),s.setDate(s.getDate()+1);if(s.getDay()!=0)for(let e=s.getDay();e<=7;e++)p+="<td></td>";p+="</tr></table>";F.innerHTML=p;const Y=document.querySelector(".calendar__table");Y.addEventListener("click",e=>{Number(e.target.textContent)&&(_.setDate(e.target.textContent),I.innerHTML=_.toLocaleString("ru-ru",{month:"long",day:"numeric"})),m(_)});

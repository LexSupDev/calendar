(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function c(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=c(i);fetch(i.href,l)}})();function _(n){let e=new Set,c=new Set,s=new Set,i=new Set;n.Events.forEach(t=>{e.add(t.startTime),c.add(t.duration),s.add(t.location),i.add(t.participants.join(","))});const l=document.querySelector("#filterStartTime"),a=document.querySelector("#filterDuration"),r=document.querySelector("#filterLocation"),u=document.querySelector("#filterParticipants");l.innerHTML='<option value="" class="startTime__listItem">Все</option>',a.innerHTML='<option value="" class="duration__listItem">Все</option>',r.innerHTML='<option value="" class="location__listItem">Все</option>',u.innerHTML='<option value="" class="participant__listItem">Все</option>',e.forEach(t=>{let o=`<option value="${t}" class="startTime__listItem">${t}</option>`;l.innerHTML+=o}),Array.from(c).sort((t,o)=>t-o).forEach(t=>{let o=`<option value="${t}" class="duration__listItem">${t}</option>`;a.innerHTML+=o}),s.forEach(t=>{let o=`<option value="${t}" class="location__listItem">${t}</option>`;r.innerHTML+=o}),i.forEach(t=>{let o=`<option value="${t}" class="participants__listItem">${t}</option>`;u.innerHTML+=o})}function I(n){const e=document.querySelector("#filterStartTime"),c=document.querySelector("#filterDuration"),s=document.querySelector("#filterLocation"),i=document.querySelector("#filterParticipants"),l=t(e,"startTime"),a=t(c,"duration"),r=t(i,"participants"),u=t(s,"location");function t(p,m){return function(v){return p.value?typeof v[m]=="object"?v[m].join(",")===p.value:v[m]===p.value:!0}}let o=d();function d(){return{Events:n.Events.slice(0).filter(l).filter(a).filter(u).filter(r)}}return o.Events}function g(n,e){document.querySelector(".filters__wrapper").addEventListener("change",()=>{f(n,e)})}function q(){return localStorage.getItem("eventsList")?JSON.parse(localStorage.getItem("eventsList")):{Events:[{title:"Соревнование по лёгкой атлетике",date:"2023-03-15",startTime:"14:30",duration:"4",location:"Бауманская",participants:["Тренер","Мартышка"]},{title:"Воллейбол",date:"2023-03-16",startTime:"12:30",duration:"1",location:"Сокольники",participants:["Саня","Яна"]}]}}function S(n){localStorage.setItem("eventsList",JSON.stringify(n))}function h(n){const e=document.querySelector(".events__date");e.innerHTML=n.toLocaleString("ru-ru",{month:"long",day:"numeric",year:"numeric"})}function f(n,e){let c=I(n),s={Events:[]};c.forEach(l=>{let a=new Date(l.date);e.getDate()===a.getDate()&&e.getMonth()===a.getMonth()&&e.getFullYear()===a.getFullYear()&&s.Events.push(l)});const i=document.querySelector(".events__list");i.innerHTML="",s.Events.forEach(l=>{let a=`<article class="events_listItem eventItem"><div class="eventItem__controlBlock"><span class="eventItem__controlItem btn btn--save collapse"></span><span class="eventItem__controlItem btn btn--edit"></span>
      <span class="eventItem__controlItem btn btn--del"></span>
      </div>
    <p class="eventItem__title">${l.title}</p>                                                             
    <div class="eventItem__row">                                                                                                
    <span class="eventItem__startTime">Время начала: <span class="eventItem__startTimeSpan">${l.startTime}</span></span>                      
    <span class="eventItem__duration">\\ Длительность: <span class="eventItem__durationSpan">${l.duration}</span></span>              
    </div>                                                                                                                      
    <p class="eventItem__location">Место: <span class="eventItem__locationSpan">${l.location}</span></p>                               
    <p class="eventItem__participants">Участники: 
    <span class="eventItem__participantsSpan">${l.participants.join(",")}</span></p></article>`;i.innerHTML+=a}),L(s,n,e),M(n,e)}function L(n,e,c){const s=document.querySelectorAll(".btn--edit"),i=document.querySelectorAll(".btn--del"),l=document.querySelectorAll(".btn--save");i.forEach((a,r)=>{a.addEventListener("click",u=>{u.target.parentElement.parentElement.remove(),e.Events.forEach((t,o)=>{JSON.stringify(t)===JSON.stringify(n.Events[r])&&(e.Events.splice(o,1),S(e),_(e),y(e,c),f(e,c))})})}),s.forEach((a,r)=>{a.addEventListener("click",u=>{u.preventDefault(),a.classList.add("collapse"),l[r].classList.remove("collapse");let t=u.target.parentElement.parentElement,o=t.querySelector(".eventItem__title"),d=t.querySelector(".eventItem__startTimeSpan"),p=t.querySelector(".eventItem__durationSpan"),m=t.querySelector(".eventItem__locationSpan"),v=t.querySelector(".eventItem__participantsSpan");o.innerHTML=`<input type="text" value="${o.textContent}">`,d.innerHTML=`<input type="time" value="${d.textContent}">`,p.innerHTML=`<input type="text" value="${p.textContent}">`,m.innerHTML=`<input type="text" value="${m.textContent}">`,v.innerHTML=`<input type="text" value="${v.textContent}">`,l[r].addEventListener("click",T=>{T.preventDefault(),e.Events.forEach((D,E)=>{JSON.stringify(D)===JSON.stringify(n.Events[r])&&(e.Events[E].title=o.children[0].value,e.Events[E].startTime=d.children[0].value,e.Events[E].duration=p.children[0].value,e.Events[E].location=m.children[0].value,e.Events[E].participants=v.children[0].value.split(","),S(e),_(e),y(e,c),f(e,c))})})})})}function M(n,e){const c=document.querySelector(".events__addButton"),s=document.querySelector(".events__addPopup");c.removeEventListener("click",()=>{console.log("remove")}),c.addEventListener("click",()=>{s.classList.contains("collapse")?s.classList.remove("collapse"):s.classList.add("collapse"),console.log("add"),console.log(e)}),document.querySelector(".addEventPopup__form").addEventListener("submit",l=>{const a=document.querySelector("#event-title"),r=document.querySelector("#event-date"),u=document.querySelector("#event-startTime"),t=document.querySelector("#event-duration"),o=document.querySelector("#event-location"),d=document.querySelector("#event-participants");l.preventDefault(),n.Events.push({title:a.value,date:r.value,startTime:u.value,duration:t.value,location:o.value,participants:d.value.split(",")}),S(n),_(n),y(n,e),f(n,e)})}function y(n,e){function c(){const a=document.querySelector("#calendar");let r=new Date(new Date().getFullYear(),new Date().getMonth());const u=e.getDate(),t=r.getMonth();let o="<table class='calendar__table table table-bordered JS-calendar'><thead><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></thead><tr>";for(let d=1;d<r.getDay();d++)o+="<td></td>";for(;r.getMonth()===t;)s(r,n)&&r.getDate()===u?o+="<td class='table-active has-event'>"+r.getDate()+"</td>":r.getDate()===u?o+="<td class='table-active'>"+r.getDate()+"</td>":s(r,n)?o+="<td class='has-event'>"+r.getDate()+"</td>":o+="<td>"+r.getDate()+"</td>",r.getDay()%7===0&&(o+="</tr><tr>"),r.setDate(r.getDate()+1);if(r.getDay()!==0)for(let d=r.getDay();d<=7;d++)o+="<td></td>";o+="</tr></table>",a.innerHTML=o}function s(a,r){return!!r.Events.filter(t=>new Date(t.date).getDate()===a.getDate()&&new Date(t.date).getMonth()===a.getMonth()&&new Date(t.date).getFullYear()===a.getFullYear()).length}function i(a){const r=a.currentTarget.querySelectorAll("td"),u=a.target.textContent;e=new Date(new Date().setDate(u)),r.forEach(t=>t.classList.remove("table-active")),u&&a.target.tagName==="TD"&&a.target.classList.add("table-active"),h(e),f(n,e)}c(),document.querySelector(".JS-calendar").addEventListener("click",i)}function w(){let n=q(),e=new Date;y(n,e),h(e),f(n,e),g(n,e),_(n),g(n,e),S(n)}w();
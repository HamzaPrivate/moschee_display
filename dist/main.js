(()=>{"use strict";var e={130:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getFormattedDate=void 0,t.getFormattedDate=function(e){return`${e.getDate()} ${e.getMonth()+1} ${e.getFullYear()}`}},240:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function c(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.intiateDatum=t.calcTimeTillPrayer=t.initiatePrayerTable=t.timeUntilMidnight=void 0;const o=n(991);var a=document.getElementById("time"),i=new Date,c=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);t.timeUntilMidnight=c.getTime()-i.getTime();const s=document.getElementsByClassName("namaztime");var l=s[0].style.color;t.initiatePrayerTable=function(){return r(this,void 0,void 0,(function*(){const e=yield(0,o.getTodaysPrayerTimes)();if(console.log(e),!s||!e)throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${s}, prayerTimes: ${e}`);for(let t=0;t<e.length;t++)console.log(s[t]),s[t].textContent=e[t]}))},t.calcTimeTillPrayer=function(){var e;const t=new Date;console.log(t);const n=t.getHours(),r=t.getMinutes();t.setHours(n,r,0);const o=new Date;let i=s;for(let t=0;t<i.length;t++){let a=null===(e=i[t].textContent)||void 0===e?void 0:e.split(":");if(i[t].style.color=l,i[t].parentElement.classList.remove("glass"),Number(a[0])>n||Number(a[0])==n&&Number(a[1])>r){o.setHours(Number(a[0]),Number(a[1]),0),i[t].style.color="red",i[t].parentElement.classList.add("glass");break}}const c=Math.floor((o.getTime()-t.getTime())/6e4),u=Math.floor(c/60),d=c%60;a.textContent=0==u?` ${d}min`:` ${u}h:${d}min`},t.intiateDatum=function(){}},991:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function c(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getTodaysPrayerTimes=void 0;const o=n(130);t.getTodaysPrayerTimes=function(){return r(this,void 0,void 0,(function*(){try{const e=yield fetch("PrayerTimes.json"),t=yield e.json(),n=new Date,r=(0,o.getFormattedDate)(n);return t.hasOwnProperty(r)?t[r].split("|"):(console.log("Prayer times for today are not available."),[])}catch(e){return console.error("Error:",e),[]}}))}},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.displayDoubleImage=t.displayBroadImage=t.displayVideo=t.videoComing=t.displayNextResource=void 0;var n=document.getElementById("narrow-img-container"),r=document.getElementById("broad"),o=document.getElementById("narrow1"),a=document.getElementById("narrow2"),i=document.getElementById("vid");const c="pictures/narrow/";var s=[`${c}n0.jpeg`,`${c}n1.jpeg`,`${c}n6.jpeg`],l=[`${c}n3.jpeg`,`${c}n4.jpeg`],u=["pictures/broad/b0.jpeg","pictures/broad/b1.jpeg"],d=v(s),m=v(l),g=v(u);r.addEventListener("click",(()=>{y()})),n.addEventListener("click",(()=>{y()}));var f=0;function y(){if(f<2)w();else if(2==f)return p()?h():b(),void(f=0);f++}function v(e,t){if(1===e.length)return t||0;let n=Math.floor(Math.random()*e.length);for(;n===t;)n=Math.floor(Math.random()*e.length);return n}function p(){return u[g].endsWith("mp4")}function h(){if(!p())return;n.style.display="none",r.style.display="none";let e=i.style;e.display="unset",e.border="5px solid",e.borderColor="#926c2f",e.boxShadow="11px 11px 11px #6f4e18",e.animationName="fadeIn",e.animationTimingFunction="ease-in-out",e.animationDuration="1.5s",i.src=u[g],g=v(u,g)}function b(){n.style.display="none",r.src=u[g],r.style.display="unset",g=v(u,g)}function w(){r.style.display="none",r.src="",n.style.display="flex",o.src=s[d],a.src=l[m],d=v(s,d),m=v(l,m)}t.displayNextResource=y,t.videoComing=p,t.displayVideo=h,t.displayBroadImage=b,t.displayDoubleImage=w},590:function(e,t,n){var r,o=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return a(t,e),t},c=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function c(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,c)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=i(n(650)),l=n(240);null===(r=document.querySelector("table"))||void 0===r||r.addEventListener("click",(()=>{window.location.reload()})),setTimeout((()=>window.location.reload()),l.timeUntilMidnight+6e4);const u=document.querySelector("#digit1"),d=document.querySelector("#time_text");function m(){const e=document.querySelector("body").classList,t=(new Date).getHours();t>=0&&t<6?(e.remove("day"),e.remove("evening"),e.remove("night"),e.add("night")):t>=6&&t<12?(e.remove("day"),e.remove("evening"),e.remove("night"),e.add("sunrise")):t>=12&&t<18?(e.remove("day"),e.remove("evening"),e.remove("night"),e.add("day")):t>=18&&t<24&&(e.remove("day"),e.remove("evening"),e.remove("night"),e.add("night"))}function g(e){return e<10?`0${e}`:`${e}`}"wakeLock"in navigator&&navigator.wakeLock.request("screen").then((e=>{console.log("Screen wake lock is active!")})).catch((e=>{console.error("Failed to acquire screen wake lock:",e)})),function(){c(this,void 0,void 0,(function*(){s.videoComing()?s.displayVideo():s.displayBroadImage(),yield(0,l.initiatePrayerTable)(),function(){const e=new Date;d.textContent=`${g(e.getHours())}:${g(e.getMinutes())}`,document.querySelector("#bt-bot-line").textContent=`${function(e){switch(e){case"Montag":return"Ponedjeljak";case"Dienstag":return"Utorak";case"Mittwoch":return"Srijeda";case"Donnerstag":return"Četvrtak";case"Freitag":return"Petak";case"Samstag":return"Subota";case"Sonntag":return"Nedjelja";default:return""}}(e.toLocaleString("default",{weekday:"long"}))} - ${e.getDate()}. ${function(e){switch(e){case"Januar":return"Januar";case"Februar":return"Februar";case"März":return"Mart";case"April":return"April";case"Mai":return"Maj";case"Juni":return"Juni";case"Juli":return"Juli";case"August":return"August";case"September":return"Septembar";case"Oktober":return"Oktobar";case"November":return"Novembar";case"Dezember":return"Decembar";default:return""}}(e.toLocaleString("default",{month:"long"}))}`}(),(0,l.calcTimeTillPrayer)(),m(),setInterval((()=>{s.displayNextResource(),(0,l.calcTimeTillPrayer)(),m()}),6e4),setInterval((()=>{const e=new Date,t=e.getSeconds();if(console.log(t),0==t){const t=e.getMinutes();if(d.textContent=`${g(e.getHours())}:${g(t)}`,0==t){const n=e.getHours();d.textContent=`${g(n)}:${g(t)}`}}u.textContent=`${g(e.getSeconds())}`}),1e3)}))}()}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}(590)})();
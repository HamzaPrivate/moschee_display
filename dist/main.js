(()=>{"use strict";var e={130:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getFormattedDate=void 0,t.getFormattedDate=function(e){return`${e.getDate()} ${e.getMonth()+1} ${e.getFullYear()}`}},240:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.calcTimeTillPrayer=t.initiatePrayerTable=t.timeUntilMidnight=void 0;const o=n(130),r=n(991);var a=document.getElementById("time"),i=new Date,l=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);t.timeUntilMidnight=l.getTime()-i.getTime();const s=document.getElementById("prayerTable");t.initiatePrayerTable=function(){const e=(0,o.getFormattedDate)(i),t=r.map.get(e);if(!s||!t)throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${s}, prayerTimes: ${t}`);{let e=t.split("|"),n=s.rows[1].cells;for(let t=0;t<e.length;t++)n[t].textContent=e[t]}},t.calcTimeTillPrayer=function(){var e;const t=new Date,n=t.getHours(),o=t.getMinutes();t.setHours(n,o,0);const r=new Date;let i=s.rows[1].cells;for(let t=0;t<i.length;t++){let a=null===(e=i[t].textContent)||void 0===e?void 0:e.split(":");if(i[t].style.color="black",Number(a[0])>n||Number(a[0])==n&&Number(a[1])>o){r.setHours(Number(a[0]),Number(a[1]),0),i[t].style.color="red";break}}const l=Math.floor((r.getTime()-t.getTime())/6e4),d=Math.floor(l/60),m=l%60;a.textContent=0==d?` ${m}min`:` ${d}h:${m}min`,(n>=0&&n<9||(""+t).includes("Fri")&&n<=14)&&(a.textContent="",document.getElementById("text-before-time").textContent="")}},991:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.map=void 0,t.map=new Map,t.map.set("1 6 2023","3:04|4:49|13:05|17:26|21:20|23:04"),t.map.set("2 6 2023","3:03|4:48|13:05|17:27|21:21|23:05"),t.map.set("3 6 2023","3:03|4:48|13:05|17:27|21:22|23:06"),t.map.set("4 6 2023","3:03|4:47|13:05|17:28|21:23|23:06"),t.map.set("5 6 2023","3:02|4:46|13:05|17:28|21:24|23:07"),t.map.set("6 6 2023","3:02|4:46|13:06|17:29|21:25|23:08"),t.map.set("7 6 2023","3:02|4:45|13:06|17:29|21:26|23:08"),t.map.set("8 6 2023","3:02|4:45|13:06|17:30|21:27|23:09"),t.map.set("9 6 2023","3:02|4:44|13:06|17:30|21:28|23:09"),t.map.set("10 6 2023","3:01|4:44|13:06|17:30|21:28|23:10"),t.map.set("11 6 2023","3:01|4:43|13:07|17:31|21:29|23:10"),t.map.set("12 6 2023","3:01|4:43|13:07|17:31|21:30|23:11"),t.map.set("13 6 2023","3:01|4:43|13:07|17:31|21:30|23:11"),t.map.set("14 6 2023","3:01|4:43|13:07|17:32|21:31|23:11"),t.map.set("15 6 2023","3:01|4:42|13:07|17:32|21:32|23:12"),t.map.set("16 6 2023","3:01|4:42|13:08|17:32|21:32|23:12"),t.map.set("17 6 2023","3:01|4:42|13:08|17:33|21:33|23:12"),t.map.set("18 6 2023","3:01|4:42|13:08|17:33|21:33|23:13"),t.map.set("19 6 2023","3:02|4:42|13:08|17:33|21:33|23:13"),t.map.set("20 6 2023","3:02|4:42|13:08|17:33|21:34|23:13"),t.map.set("21 6 2023","3:02|4:43|13:09|17:34|21:34|23:13"),t.map.set("22 6 2023","3:02|4:43|13:09|17:34|21:34|23:14"),t.map.set("23 6 2023","3:02|4:43|13:09|17:34|21:34|23:14"),t.map.set("24 6 2023","3:03|4:43|13:09|17:34|21:34|23:14"),t.map.set("25 6 2023","3:03|4:44|13:10|17:34|21:34|23:14"),t.map.set("26 6 2023","3:03|4:44|13:10|17:34|21:34|23:14"),t.map.set("27 6 2023","3:04|4:45|13:10|17:35|21:34|23:14"),t.map.set("28 6 2023","3:04|4:45|13:10|17:35|21:34|23:14"),t.map.set("29 6 2023","3:04|4:46|13:10|17:35|21:34|23:14"),t.map.set("30 6 2023","3:05|4:46|13:11|17:35|21:33|23:14")},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.displayDoubleImage=t.displayBroadImage=t.displayVideo=t.videoComing=t.displayNextResource=void 0;var n=document.getElementById("img-container"),o=document.getElementById("broad"),r=document.getElementById("narrow1"),a=document.getElementById("narrow2"),i=document.getElementById("vid");const l="pictures/narrow/";var s=[`${l}n0.jpeg`,`${l}n1.jpeg`],d=[`${l}n3.jpeg`,`${l}n4.jpeg`,`${l}n5.jpeg`],m=["pictures/broad/b0.jpeg","pictures/broad/b1.jpeg"],c=f(s),u=f(d),p=f(m);o.addEventListener("click",(()=>{g()})),n.addEventListener("click",(()=>{g()}));var y=0;function g(){if(y<2)x();else if(2==y)return b()?v():h(),void(y=0);y++}function f(e,t){if(1===e.length)return t||0;let n=Math.floor(Math.random()*e.length);for(;n===t;)n=Math.floor(Math.random()*e.length);return n}function b(){return m[p].endsWith("mp4")}function v(){if(!b())return;n.style.display="none",o.style.display="none";let e=i.style;e.display="unset",e.border="5px solid",e.borderColor="#926c2f",e.boxShadow="11px 11px 11px #6f4e18",e.animationName="fadeIn",e.animationTimingFunction="ease-in-out",e.animationDuration="1.5s",i.src=m[p],p=f(m,p)}function h(){n.style.display="none",i.style.display="none",o.src=m[p];let e=o.style;e.border="5px solid",e.borderColor="#926c2f",e.boxShadow="11px 11px 11px #6f4e18",e.animationTimingFunction="ease-in-out",e.animationDuration="1.5s",e.display="unset",p=f(m,p)}function x(){i.style.display="none",o.style.display="none",o.src="",n.style.display="flex",r.src=s[c],a.src=d[u],c=f(s,c),u=f(d,u)}t.displayNextResource=g,t.videoComing=b,t.displayVideo=v,t.displayBroadImage=h,t.displayDoubleImage=x},590:function(e,t,n){var o,r=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const l=i(n(650)),s=n(240);null===(o=document.querySelector("table"))||void 0===o||o.addEventListener("click",(()=>{window.location.reload()})),setTimeout((()=>window.location.reload()),s.timeUntilMidnight+6e4),function(){l.videoComing()?l.displayVideo():l.displayBroadImage(),(0,s.initiatePrayerTable)(),(0,s.calcTimeTillPrayer)(),setInterval((()=>{l.displayNextResource(),(0,s.calcTimeTillPrayer)()}),6e4);const e=document.querySelector("#hr"),t=document.querySelector("#min"),n=document.querySelector("#sec");setInterval((()=>{const o=new Date,r=30*o.getHours(),a=6*o.getMinutes(),i=6*o.getSeconds();e.style.transform=`rotateZ(${r+a/12}deg)`,t.style.transform=`rotateZ(${a}deg)`,n.style.transform=`rotateZ(${i}deg)`}))}()}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}(590)})();
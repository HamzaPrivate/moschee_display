(()=>{"use strict";var e={240:function(e,t){var n=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{c(i.next(e))}catch(e){r(e)}}function l(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.calcTimeTillPrayer=t.initiatePrayerTable=t.timeUntilMidnight=void 0,document.getElementById("time");var i=new Date,o=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1);t.timeUntilMidnight=o.getTime()-i.getTime(),document.getElementById("prayerTable"),t.initiatePrayerTable=function(){return n(this,void 0,void 0,(function*(){}))},t.calcTimeTillPrayer=function(){}},650:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.displayDoubleImage=t.displayBroadImage=t.displayVideo=t.videoComing=t.displayNextResource=void 0;var n=document.getElementById("narrow-img-container"),i=document.getElementById("broad"),o=document.getElementById("narrow1"),r=document.getElementById("narrow2"),a=document.getElementById("vid");const l="pictures/narrow/";var c=[`${l}n0.jpeg`,`${l}n1.jpeg`,`${l}n6.jpeg`],d=[`${l}n3.jpeg`,`${l}n4.jpeg`],u=["pictures/broad/b0.jpeg","pictures/broad/b1.jpeg"],s=g(c),f=g(d),y=g(u);i.addEventListener("click",(()=>{m()})),n.addEventListener("click",(()=>{m()}));var p=0;function m(){if(p<2)w();else if(2==p)return v()?h():b(),void(p=0);p++}function g(e,t){if(1===e.length)return t||0;let n=Math.floor(Math.random()*e.length);for(;n===t;)n=Math.floor(Math.random()*e.length);return n}function v(){return u[y].endsWith("mp4")}function h(){if(!v())return;n.style.display="none",i.style.display="none";let e=a.style;e.display="unset",e.border="5px solid",e.borderColor="#926c2f",e.boxShadow="11px 11px 11px #6f4e18",e.animationName="fadeIn",e.animationTimingFunction="ease-in-out",e.animationDuration="1.5s",a.src=u[y],y=g(u,y)}function b(){n.style.display="none",i.src=u[y],i.style.display="unset",y=g(u,y)}function w(){i.style.display="none",i.src="",n.style.display="flex",o.src=c[s],r.src=d[f],s=g(c,s),f=g(d,f)}t.displayNextResource=m,t.videoComing=v,t.displayVideo=h,t.displayBroadImage=b,t.displayDoubleImage=w},590:function(e,t,n){var i,o=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t},l=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{c(i.next(e))}catch(e){r(e)}}function l(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const c=a(n(650)),d=n(240);null===(i=document.querySelector("table"))||void 0===i||i.addEventListener("click",(()=>{window.location.reload()})),setTimeout((()=>window.location.reload()),d.timeUntilMidnight+6e4),function(){l(this,void 0,void 0,(function*(){c.videoComing()?c.displayVideo():c.displayBroadImage(),yield(0,d.initiatePrayerTable)(),(0,d.calcTimeTillPrayer)()}))}()}},t={};!function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}(590)})();
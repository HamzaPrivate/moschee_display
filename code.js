"use strict";
var _a;
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
console.log("1. now and midnight and timeUntilMidnight", now, midnight, timeUntilMidnight);
//
var infosImg = document.getElementById("infos");
var ahadithImg = document.getElementById("ahadith");
var infosSources = ["infos/ramazan0.jpeg", "infos/info0.jpeg", "infos/ramazan1.jpeg"];
var ahadithSources = ["ahadith/ramazan0.jpeg", "ahadith/ramazan1.jpeg"];
var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
infosImg.src = infosSources[infosIndex];
ahadithImg.src = ahadithSources[ahadithIndex];
(_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    reloadPage();
});
const map = new Map();
map.set("Mar 30 2023", "5:07|6:45|13:11|16:41|19:37|21:16");
map.set("Mar 31 2023", "5:04|6:43|13:11|16:42|19:39|21:18");
map.set("Apr 01 2023", "5:01|6:41|13:11|16:43|19:41|21:20");
map.set("Apr 02 2023", "4:58|6:38|13:11|16:44|19:43|21:23");
map.set("Apr 03 2023", "4:56|6:36|13:10|16:45|19:44|21:25");
map.set("Apr 04 2023", "4:53|6:34|13:10|16:46|19:45|21:27");
map.set("Apr 05 2023", "4:50|6:31|13:10|16:47|19:48|21:29");
map.set("Apr 06 2023", "4:47|6:29|13:09|16:48|19:50|21:31");
map.set("Apr 07 2023", "4:44|6:27|13:09|16:49|19:51|21:34");
map.set("Apr 08 2023", "4:42|6:25|13:09|16:50|19:53|21:36");
map.set("Apr 09 2023", "4:39|6:22|13:09|16:51|19:55|21:38");
map.set("Apr 10 2023", "4:36|6:20|13:08|16:51|19:57|21:41");
map.set("Apr 11 2023", "4:33|6:18|13:08|16:52|19:58|21:43");
map.set("Apr 12 2023", "4:30|6:15|13:08|16:53|20:00|21:45");
map.set("Apr 13 2023", "4:27|6:13|13:07|16:54|20:02|21:48");
map.set("Apr 14 2023", "4:24|6:11|13:07|16:55|20:04|21:50");
map.set("Apr 15 2023", "4:21|6:09|13:07|16:56|20:05|21:53");
map.set("Apr 16 2023", "4:18|6:06|13:07|16:56|20:07|21:55");
map.set("Apr 17 2023", "4:15|6:04|13:06|16:57|20:09|21:58");
map.set("Apr 18 2023", "4:12|6:02|13:06|16:58|20:11|22:00");
map.set("Apr 19 2023", "4:09|6:00|13:06|16:59|20:12|22:03");
map.set("Apr 20 2023", "4:06|5:58|13:06|17:00|20:14|22:05");
const prayerTable = document.getElementById("zeiten");
const prayerTimes = map.get(getFormattedDate("" + now).trim()); //check
console.log("2. getformattedDate", getFormattedDate(now + ""));
//injecting prayer times into the table
if (prayerTable && prayerTimes) {
    let splitter = prayerTimes.split("|");
    let cells = prayerTable.rows[1].cells;
    for (let i = 0; i < splitter.length; i++) {
        cells[i].textContent = splitter[i];
    }
}
else
    console.log("Fehler in der Anzeige der Gebetszeiten.");
setTimeout(reloadPage, timeUntilMidnight + 60000);
setInterval(function () {
    infosIndex = getNewPic(infosIndex, infosSources);
    ahadithIndex = getNewPic(ahadithIndex, ahadithSources);
    infosImg.src = infosSources[infosIndex];
    ahadithImg.src = ahadithSources[ahadithIndex];
}, 60000);
//help functions
function reloadPage() { window.location.reload(); }
//returns formatted date in Mar 27 2023
function getFormattedDate(date) {
    let fulldate = "" + now;
    let formatted = fulldate.split(/Mon|Tue|Wed|Thu|Fri|Sat|Sun|2023/g);
    console.log("1.5 formatted in datefunction", formatted);
    return formatted[1] + now.getFullYear();
}
function getNewPic(indexToExclude, pictureGroup) {
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}

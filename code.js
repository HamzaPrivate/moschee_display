"use strict";
var _a;
(_a = document.querySelector("table")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    reloadPage();
});
const map = new Map();
initMap();
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
console.log("1. now and midnight and timeUntilMidnight", now, midnight, timeUntilMidnight);
const prayerTable = document.getElementById("zeiten");
const prayerTimes = map.get(getFormattedDate("" + now).trim());
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
//time calc for next prayer
var time = document.getElementById("time");
calcTimeTillPrayer();
//main images
var broadImg = document.getElementById("broad");
var infosImg = document.getElementById("infos");
var ahadithImg = document.getElementById("ahadith");
var video = document.getElementById("vid");
var infosSources = ["infos/i0.jpeg", "infos/i1.jpeg", "infos/i2.jpeg", "infos/i3.jpeg"]; //upright video sources possible
var ahadithSources = ["ahadith/a0.jpeg", "ahadith/a1.jpeg", "ahadith/a2.jpeg"];
var broadSources = ["broad/broad1.jpeg", "broad/sufara.jpeg"]; //broad video sources possible
var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
var broadIndex = Math.floor(Math.random() * broadSources.length);
if (videoComing())
    displayVideo();
else
    video.style.display = "none";
//starts displaying here by starting with a broad img
var image_container = document.getElementById("img-container");
displayBroadImage();
var counter = 0;
broadImg.addEventListener("click", () => {
    displayOrder();
});
image_container.addEventListener("click", () => {
    displayOrder();
});
setInterval(function () {
    displayOrder();
    calcTimeTillPrayer();
}, 60000); //60000
//help functions
function reloadPage() { window.location.reload(); }
//returns formatted date in Mar 27 2023
function getFormattedDate(date) {
    let fulldate = "" + now;
    let formatted = fulldate.split(/Mon|Tue|Wed|Thu|Fri|Sat|Sun|2023/g);
    console.log("1.5 formatted in datefunction", formatted);
    return formatted[1] + now.getFullYear();
}
function calcTimeTillPrayer() {
    var _a;
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentDate = new Date();
    currentDate.setHours(currentHour, currentMinute, 0);
    const targetDate = new Date();
    let cells = prayerTable.rows[1].cells;
    console.log(currentHour);
    for (let i = 0; i < cells.length; i++) {
        let time = (_a = cells[i].textContent) === null || _a === void 0 ? void 0 : _a.split(":");
        cells[i].style.color = "black";
        //if number in table cell > current hour OR number in table cell = current hour but minutes are greater
        //display the cell content red and set that cell as the target
        if (Number(time[0]) > currentHour || (Number(time[0]) == currentHour && Number(time[1]) > currentMinute)) {
            targetDate.setHours(Number(time[0]), Number(time[1]), 0);
            cells[i].style.color = "red";
            break;
        }
    }
    //calculate time difference
    const timeDiffMinutes = Math.floor((targetDate.getTime() - currentDate.getTime()) / 60000);
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;
    if (hours == 0)
        time.textContent = ` ${minutes}min`;
    else
        time.textContent = ` ${hours}h:${minutes}min`;
    if ((currentHour >= 0 && currentHour < 9)) {
        time.textContent = "";
        document.getElementById("time-until").textContent = "";
    }
}
/**
 *
 * @param indexToExclude current index to the current picture
 * @param pictureGroup the respective array where the files are stored in
 * @returns
 */
function getNewPic(pictureGroup, indexToExclude) {
    if (pictureGroup.length === 1)
        return indexToExclude || Math.floor(Math.random() * pictureGroup.length);
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}
function videoComing() {
    return infosSources[infosIndex].endsWith("mp4");
}
function displayVideo() {
    infosImg.style.display = "none";
    video.style.minWidth = "auto";
    video.style.maxWidth = "auto";
    video.style.display = "unset";
    video.src = infosSources[infosIndex];
}
function displayBroadVideo() {
    image_container.style.display = "none";
    broadImg.style.display = "none";
    let vStyle = video.style;
    vStyle.display = "unset";
    vStyle.border = "5px solid";
    vStyle.borderColor = "#926c2f";
    vStyle.boxShadow = "11px 11px 11px #6f4e18";
    vStyle.animationName = "fadeIn";
    vStyle.animationTimingFunction = "ease-in-out";
    vStyle.animationDuration = "1.5s";
}
function displayBroadImage() {
    image_container.style.display = "none";
    video.style.display = "none";
    broadIndex = getNewPic(broadSources, broadIndex);
    broadImg.src = broadSources[broadIndex];
    let bStyle = broadImg.style;
    bStyle.border = "5px solid";
    bStyle.borderColor = "#926c2f";
    bStyle.boxShadow = "11px 11px 11px #6f4e18";
    bStyle.animationName = "fadeIn";
    bStyle.animationTimingFunction = "ease-in-out";
    bStyle.animationDuration = "1.5s";
    bStyle.display = "unset";
}
function displayDoubleImage() {
    video.style.display = "none";
    let bStyle = broadImg.style;
    bStyle.display = "none";
    bStyle.border = "0px";
    bStyle.boxShadow = "";
    broadImg.src = "";
    image_container.style.display = "flex";
    infosImg.style.display = "unset";
    infosIndex = getNewPic(infosSources, infosIndex);
    ahadithIndex = getNewPic(ahadithSources, ahadithIndex);
    if (videoComing())
        displayVideo();
    else {
        infosImg.src = infosSources[infosIndex];
        video.style.display = "none";
    }
    ahadithImg.src = ahadithSources[ahadithIndex];
}
function displayOrder() {
    if (counter < 2)
        displayDoubleImage(); //displayDoubleImage(); 
    else if (counter == 2) {
        if (videoComing())
            displayBroadVideo(); //displayBroadImage(); 
        else
            displayBroadImage();
        counter = 0;
        return;
    }
    counter++;
}
setTimeout(reloadPage, timeUntilMidnight + 60000);
const degree = 6;
const hr = document.querySelector("#hr");
const min = document.querySelector("#min");
const sec = document.querySelector("#sec");
setInterval(() => {
    const date = new Date();
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * degree;
    const ss = date.getSeconds() * degree;
    hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
});
function initMap() {
    map.set("May 31 2023", "3:04|4:50|13:05|17:26|21:19|23:04");
    map.set("Jun 01 2023", "3:04|4:49|13:05|17:26|21:20|23:04");
    map.set("Jun 02 2023", "3:03|4:48|13:05|17:27|21:21|23:05");
    map.set("Jun 03 2023", "3:03|4:48|13:05|17:27|21:22|23:06");
    map.set("Jun 04 2023", "3:03|4:47|13:05|17:28|21:23|23:06");
    map.set("Jun 05 2023", "3:02|4:46|13:05|17:28|21:24|23:07");
    map.set("Jun 06 2023", "3:02|4:46|13:06|17:29|21:25|23:08");
    map.set("Jun 07 2023", "3:02|4:45|13:06|17:29|21:26|23:08");
    map.set("Jun 08 2023", "3:02|4:45|13:06|17:30|21:27|23:09");
    map.set("Jun 09 2023", "3:02|4:44|13:06|17:30|21:28|23:09");
    map.set("Jun 10 2023", "3:01|4:44|13:06|17:30|21:28|23:10");
    map.set("Jun 11 2023", "3:01|4:43|13:07|17:31|21:29|23:10");
    map.set("Jun 12 2023", "3:01|4:43|13:07|17:31|21:30|23:11");
    map.set("Jun 13 2023", "3:01|4:43|13:07|17:31|21:30|23:11");
    map.set("Jun 14 2023", "3:01|4:43|13:07|17:32|21:31|23:11");
    map.set("Jun 15 2023", "3:01|4:42|13:07|17:32|21:32|23:12");
    map.set("Jun 16 2023", "3:01|4:42|13:08|17:32|21:32|23:12");
    map.set("Jun 17 2023", "3:01|4:42|13:08|17:33|21:33|23:12");
    map.set("Jun 18 2023", "3:01|4:42|13:08|17:33|21:33|23:13");
    map.set("Jun 19 2023", "3:02|4:42|13:08|17:33|21:33|23:13");
    map.set("Jun 20 2023", "3:02|4:42|13:08|17:33|21:34|23:13");
    map.set("Jun 21 2023", "3:02|4:43|13:09|17:34|21:34|23:13");
    map.set("Jun 22 2023", "3:02|4:43|13:09|17:34|21:34|23:14");
    map.set("Jun 23 2023", "3:02|4:43|13:09|17:34|21:34|23:14");
    map.set("Jun 24 2023", "3:03|4:43|13:09|17:34|21:34|23:14");
    map.set("Jun 25 2023", "3:03|4:44|13:10|17:34|21:34|23:14");
    map.set("Jun 26 2023", "3:03|4:44|13:10|17:34|21:34|23:14");
    map.set("Jun 27 2023", "3:04|4:45|13:10|17:35|21:34|23:14");
    map.set("Jun 28 2023", "3:04|4:45|13:10|17:35|21:34|23:14");
    map.set("Jun 29 2023", "3:04|4:46|13:10|17:35|21:34|23:14");
    map.set("Jun 30 2023", "3:05|4:46|13:11|17:35|21:33|23:14");
}

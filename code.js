"use strict";
var _a;
(_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    reloadPage();
});
const map = new Map();
map.set("Apr 21 2023", "4:03|5:56|13:06|17:00|20:16|22:08");
map.set("Apr 22 2023", "4:00|5:53|13:05|17:01|20:18|22:10");
map.set("Apr 23 2023", "3:57|5:51|13:05|17:02|20:19|22:13");
map.set("Apr 24 2023", "3:54|5:49|13:05|17:03|20:21|22:16");
map.set("Apr 25 2023", "3:51|5:47|13:05|17:03|20:23|22:18");
map.set("Apr 26 2023", "3:48|5:45|13:05|17:04|20:25|22:21");
map.set("Apr 27 2023", "3:45|5:43|13:05|17:05|20:26|22:24");
map.set("Apr 28 2023", "3:42|5:41|13:04|17:06|20:28|22:27");
map.set("Apr 29 2023", "3:39|5:39|13:04|17:06|20:30|22:30");
map.set("Apr 30 2023", "3:36|5:37|13:04|17:07|20:31|22:32");
//
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
console.log("1. now and midnight and timeUntilMidnight", now, midnight, timeUntilMidnight);
//
var broadImg = document.getElementById("broad");
var infosImg = document.getElementById("infos");
var ahadithImg = document.getElementById("ahadith");
var video = document.getElementById("vid");
//
var infosSources = ["infos/info0.jpeg", "infos/r4.jpeg"]; //video sources used to be here
var ahadithSources = ["ahadith/ramazan0.jpeg", "ahadith/ramazan1.jpeg", "ahadith/ramazan2.jpeg"];
var broadSources = ["broad/broad1.jpeg", "broad/sufara.jpeg", "broad/halka.jpeg"];
//
var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
var broadIndex = Math.floor(Math.random() * broadSources.length);
if (videoComing())
    displayVideo();
else {
    // infosImg.src = infosSources[infosIndex];
    ahadithImg.src = ahadithSources[ahadithIndex];
    video.style.display = "none";
}
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
//starts displaying here by starting with a broad img
var image_container = document.getElementById("img-container");
displayBroadImage();
//displayBroadImage();####################################################to change back after bayram sunday
//counter to display exactly 4 images before broad one is displayed
var counter = 0;
setInterval(function () {
    if (counter < 3)
        displayBroadImage(); //displayDoubleImage(); ###############################to change back...
    else if (counter == 3) {
        if (videoComing())
            displayBroadVideo(); //displayBroadImage(); ###############################to change back...
        else
            displayBroadImage();
        counter = 0;
        return;
    }
    counter++;
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
/**
 *
 * @param indexToExclude current index to the current picture
 * @param pictureGroup the respective array where the files(paths) are stored in
 * @returns
 */
function getNewPic(indexToExclude, pictureGroup) {
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
    broadIndex = getNewPic(broadIndex, broadSources);
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
    infosIndex = getNewPic(infosIndex, infosSources);
    ahadithIndex = getNewPic(ahadithIndex, ahadithSources);
    if (videoComing())
        displayVideo();
    else {
        infosImg.src = infosSources[infosIndex];
        video.style.display = "none";
    }
    ahadithImg.src = ahadithSources[ahadithIndex];
}
setTimeout(reloadPage, timeUntilMidnight + 60000);

document.querySelector("body")?.addEventListener("click", () => {
    reloadPage();
})
const map = new Map<string, string>();

map.set("May 01 2023", "3:33|5:35|13:04|17:08|20:33|22:35");
map.set("May 02 2023", "3:27|5:33|13:04|17:09|20:35|22:40");
map.set("May 03 2023", "3:26|5:31|13:04|17:09|20:37|22:41");
map.set("May 04 2023", "3:25|5:29|13:04|17:10|20:38|22:42");
map.set("May 05 2023", "3:24|5:27|13:04|17:11|20:40|22:43");
map.set("May 06 2023", "3:23|5:25|13:04|17:11|20:42|22:44");
map.set("May 07 2023", "3:22|5:24|13:03|17:12|20:43|22:45");
map.set("May 08 2023", "3:21|5:22|13:03|17:13|20:45|22:45");
map.set("May 09 2023", "3:20|5:20|13:03|17:13|20:47|22:46");
map.set("May 10 2023", "3:19|5:18|13:03|17:14|20:48|22:47");
map.set("May 11 2023", "3:18|5:17|13:03|17:15|20:50|22:48");
map.set("May 12 2023", "3:17|5:15|13:03|17:15|20:52|22:49");
map.set("May 13 2023", "3:16|5:13|13:03|17:16|20:53|22:50");
map.set("May 14 2023", "3:15|5:12|13:03|17:16|20:55|22:50");
map.set("May 15 2023", "3:14|5:10|13:03|17:17|20:56|22:51");
map.set("May 16 2023", "3:13|5:09|13:03|17:18|20:58|22:52");
map.set("May 17 2023", "3:13|5:07|13:03|17:18|20:59|22:53");
map.set("May 18 2023", "3:12|5:06|13:03|17:19|21:01|22:54");
map.set("May 19 2023", "3:11|5:04|13:03|17:20|21:03|22:55");
map.set("May 20 2023", "3:10|5:03|13:03|17:20|21:04|22:55");
map.set("May 21 2023", "3:10|5:01|13:03|17:21|21:05|22:56");
map.set("May 22 2023", "3:09|5:00|13:04|17:21|21:07|22:57");
map.set("May 23 2023", "3:08|4:59|13:04|17:22|21:08|22:58");
map.set("May 24 2023", "3:08|4:58|13:04|17:22|21:10|22:59");
map.set("May 25 2023", "3:07|4:56|13:04|17:23|21:11|22:59");
map.set("May 26 2023", "3:07|4:55|13:04|17:23|21:12|23:00");
map.set("May 27 2023", "3:06|4:54|13:04|17:24|21:14|23:01");
map.set("May 28 2023", "3:06|4:53|13:04|17:24|21:15|23:02");
map.set("May 29 2023", "3:05|4:52|13:04|17:25|21:16|23:02");
map.set("May 30 2023", "3:05|4:51|13:04|17:26|21:18|23:03");
map.set("May 31 2023", "3:04|4:50|13:05|17:26|21:19|23:04");

map.set("Apr 30 2023", "3:36|5:37|13:04|17:07|20:31|22:32");
//
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
console.log("1. now and midnight and timeUntilMidnight", now, midnight, timeUntilMidnight);
//
var broadImg = document.getElementById("broad") as HTMLImageElement;
var infosImg = document.getElementById("infos")! as HTMLImageElement;
var ahadithImg = document.getElementById("ahadith")! as HTMLImageElement;
var video = document.getElementById("vid")! as HTMLVideoElement;
//
var infosSources = ["infos/info0.jpeg"];//video sources used to be here
var ahadithSources = ["ahadith/a0.jpeg"];
var broadSources = ["broad/broad1.jpeg", "broad/sufara.jpeg", "broad/halka.jpeg"];
//
var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
var broadIndex = Math.floor(Math.random() * broadSources.length);

if (videoComing()) displayVideo();
else {
    infosImg.src = infosSources[infosIndex];
    ahadithImg.src = ahadithSources[ahadithIndex];
    video.style.display = "none";
}

const prayerTable = document.getElementById("zeiten") as HTMLTableElement;
const prayerTimes = map.get(getFormattedDate("" + now).trim());//check
console.log("2. getformattedDate", getFormattedDate(now + ""));
//injecting prayer times into the table
if (prayerTable && prayerTimes) {
    let splitter = prayerTimes.split("|");
    let cells = prayerTable.rows[1].cells;
    for (let i = 0; i < splitter.length; i++) {
        cells[i].textContent = splitter[i];
    }
}
else console.log("Fehler in der Anzeige der Gebetszeiten.");

//starts displaying here by starting with a broad img
var image_container = document.getElementById("img-container")!;
displayBroadImage();
var counter: number = 0;
setInterval(function () {
    if (counter < 2) displayBroadImage();//displayDoubleImage(); 
    else if(counter == 2){
        if(videoComing())displayBroadVideo(); //displayBroadImage(); 
        else displayDoubleImage();
        counter = 0;
        return;
    }
    counter++;
}, 2000);//60000

//help functions
function reloadPage() { window.location.reload(); }
//returns formatted date in Mar 27 2023
function getFormattedDate(date: string): string {
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
function getNewPic(indexToExclude: number, pictureGroup: string[]): number {
    if(pictureGroup.length == 1) return indexToExclude;
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}

function videoComing(): boolean {
    return infosSources[infosIndex].endsWith("mp4");
}

function displayVideo(): void {
    infosImg.style.display = "none";
    video.style.minWidth = "auto";
    video.style.maxWidth = "auto";
    video.style.display = "unset";
    video.src = infosSources[infosIndex];
}

function displayBroadVideo(): void {
    image_container.style.display = "none";
    broadImg.style.display = "none"
    let vStyle = video.style;
    vStyle.display = "unset"
    vStyle.border = "5px solid";
    vStyle.borderColor = "#926c2f";
    vStyle.boxShadow = "11px 11px 11px #6f4e18";
    vStyle.animationName = "fadeIn";
    vStyle.animationTimingFunction = "ease-in-out";
    vStyle.animationDuration = "1.5s"
}

function displayBroadImage(): void {
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
    bStyle.animationDuration = "1.5s"
    bStyle.display = "unset"
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
    if (videoComing()) displayVideo();
    else {
        infosImg.src = infosSources[infosIndex];
        video.style.display = "none";
    }
    ahadithImg.src = ahadithSources[ahadithIndex];
}

setTimeout(reloadPage, timeUntilMidnight + 60000);

const degree = 6;
const hr = document.querySelector("#hr")! as HTMLSpanElement
const min = document.querySelector("#min")!as HTMLSpanElement
const sec = document.querySelector("#sec")!as HTMLSpanElement

setInterval(()=>{

    const date = new Date();
    const hh = date.getHours() *30;
    const mm = date.getMinutes() *degree
    const ss = date.getSeconds() *degree

    hr.style.transform = `rotateZ(${hh+ (mm / 12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`
    sec.style.transform = `rotateZ(${ss}deg)`
})

document.querySelector("body")?.addEventListener("click", () => {
    reloadPage();
})
const map = new Map<string, string>();

map.set("May 27 2023", "3:06|4:54|13:04|17:24|21:14|23:01");
map.set("May 28 2023", "3:06|4:53|13:04|17:24|21:15|23:02");
map.set("May 29 2023", "3:05|4:52|13:04|17:25|21:16|23:02");
map.set("May 30 2023", "3:05|4:51|13:04|17:26|21:18|23:03");
map.set("May 31 2023", "3:04|4:50|13:05|17:26|21:19|23:04");


var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
console.log("1. now and midnight and timeUntilMidnight", now, midnight, timeUntilMidnight);

var broadImg = document.getElementById("broad") as HTMLImageElement;
var infosImg = document.getElementById("infos")! as HTMLImageElement;
var ahadithImg = document.getElementById("ahadith")! as HTMLImageElement;
var video = document.getElementById("vid")! as HTMLVideoElement;

var infosSources = ["infos/i0.jpeg", "infos/i1.jpeg", "infos/i2.jpeg", "infos/i3.jpeg"];//upright video sources possible
var ahadithSources = ["ahadith/a0.jpeg", "ahadith/a1.jpeg", "ahadith/a2.jpeg"];
var broadSources = ["broad/broad1.jpeg", "broad/sufara.jpeg"];//broad video sources possible

var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
var broadIndex = Math.floor(Math.random() * broadSources.length);

if (videoComing()) displayVideo();
else video.style.display = "none";

const prayerTable = document.getElementById("zeiten") as HTMLTableElement;
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
else console.log("Fehler in der Anzeige der Gebetszeiten.");

//starts displaying here by starting with a broad img
var image_container = document.getElementById("img-container")!;
displayBroadImage();
var counter: number = 0;
setInterval(function () {
    if (counter < 2) displayDoubleImage();//displayDoubleImage(); 
    else if(counter == 2){
        if(videoComing())displayBroadVideo(); //displayBroadImage(); 
        else displayBroadImage();
        counter = 0;
        return;
    }
    counter++;
}, 60000);//60000

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
 * @param pictureGroup the respective array where the files are stored in
 * @returns 
 */
function getNewPic(indexToExclude: number, pictureGroup: string[]): number {
    if(pictureGroup.length===1) return indexToExclude;
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
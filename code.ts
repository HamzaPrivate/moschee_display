document.querySelector("table")?.addEventListener("click", () => {
    reloadPage();
})
const map = new Map<string, string>();
initMap();

var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
const prayerTable = document.getElementById("zeiten") as HTMLTableElement;
const date = getFormattedDate("" + now).trim();
const prayerTimes = map.get(date);
//injecting prayer times into the table
if (prayerTable && prayerTimes) {
    let splitter = prayerTimes.split("|");
    let cells = prayerTable.rows[1].cells;
    for (let i = 0; i < splitter.length; i++) {
        cells[i].textContent = splitter[i];
    }
}
else throw new Error("Fehler in der Anzeige der Gebetszeiten.");

//time calc for next prayer
var time = document.getElementById("time") as HTMLSpanElement;

//main images
var imageContainer = document.getElementById("img-container")!;
var broadImg = document.getElementById("broad") as HTMLImageElement;
var infosImg = document.getElementById("infos")! as HTMLImageElement;
var ahadithImg = document.getElementById("ahadith")! as HTMLImageElement;
var video = document.getElementById("vid")! as HTMLVideoElement;

var infosSources = ["infos/i0.jpeg", "infos/i1.jpeg", "infos/i2.jpeg"];
var ahadithSources = ["ahadith/a0.jpeg", "ahadith/a1.jpeg", "ahadith/a2.jpeg"];
var broadSources = ["broad/b1.jpeg", "broad/b2.jpeg"];//broad video sources possible

var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
var broadIndex = Math.floor(Math.random() * broadSources.length);


//starts displaying here
if (videoComing()) displayVideo();
else displayBroadImage();
calcTimeTillPrayer();

broadImg.addEventListener("click", () => {
    displayNextResource()
})
imageContainer.addEventListener("click", () => {
    displayNextResource()
})
setInterval(function () {
    displayNextResource();
    calcTimeTillPrayer();
}, 60000);//60000


//help functions
function reloadPage() { window.location.reload(); }

/**
 * 
 * @param date 
 * @returns formatted date as in Mar 27 2023
 */
function getFormattedDate(date: string): string {
    let fulldate = "" + now;
    let formatted = fulldate.split(/Mon|Tue|Wed|Thu|Fri|Sat|Sun|2023|2024/g);
    return formatted[1] + now.getFullYear();
}

function calcTimeTillPrayer() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    currentDate.setHours(currentHour, currentMinute, 0);
    //find the next prayer time from the given table and set it as the target time
    const targetDate = new Date();
    let cells = prayerTable.rows[1].cells;
    console.log(currentHour)
    for (let i = 0; i < cells.length; i++) {
        let time = cells[i].textContent?.split(":");
        cells[i].style.color = "black";
        //display the time in cell red and set it as the target if the time in the cell is the closest to the current time
        if (Number(time![0]) > currentHour || (Number(time![0]) == currentHour && Number(time![1]) > currentMinute)) {
            targetDate.setHours(Number(time![0]), Number(time![1]), 0);
            cells[i].style.color = "red";
            break;
        }
    }
    //calculate time difference
    const timeDiffMinutes = Math.floor((targetDate.getTime() - currentDate.getTime()) / 60000);
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;
    if (hours == 0) time.textContent = ` ${minutes}min`;
    else time.textContent = ` ${hours}h:${minutes}min`;
    let todayStr = "" + currentDate;
    //edgecases morning prayer and friday prayer
    if ((currentHour >= 0 && currentHour < 9) || (todayStr.includes("Fri") && currentHour <= 14)) {
        time.textContent = "";
        document.getElementById("text-before-time")!.textContent! = "";
    }
}

var displayCounter: number = 0;
function displayNextResource() {
    //2x double image, 1x broad or video into repeat
    if (displayCounter < 2) displayDoubleImage();
    else if (displayCounter == 2) {
        if (videoComing()) {
            displayVideo();
        }
        else {
            displayBroadImage();
        }
        displayCounter = 0;
        return;
    }
    displayCounter++;
}

/**
 * 
 * @param indexToExclude current index to the current pic/vid
 * @param pictureGroup the respective array where the pic/vid is stored in
 * @returns 
 */
function getNewPicIndex(pictureGroup: string[], indexToExclude?: number): number {
    //if indexToExclude not defined
    if (pictureGroup.length === 1) return indexToExclude || Math.floor(Math.random() * pictureGroup.length);
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}

function videoComing(): boolean {
    return broadSources[broadIndex].endsWith("mp4");
}

function displayVideo(): void {
    imageContainer.style.display = "none";
    broadImg.style.display = "none"
    let vStyle = video.style;
    vStyle.display = "unset"
    vStyle.border = "5px solid";
    vStyle.borderColor = "#926c2f";
    vStyle.boxShadow = "11px 11px 11px #6f4e18";
    vStyle.animationName = "fadeIn";
    vStyle.animationTimingFunction = "ease-in-out";
    vStyle.animationDuration = "1.5s"
    video.src = broadSources[broadIndex];
    broadIndex = getNewPicIndex(broadSources, broadIndex);

}

function displayBroadImage(): void {
    imageContainer.style.display = "none";
    video.style.display = "none";
    broadImg.src = broadSources[broadIndex];
    let bStyle = broadImg.style;
    bStyle.border = "5px solid";
    bStyle.borderColor = "#926c2f";
    bStyle.boxShadow = "11px 11px 11px #6f4e18";
    bStyle.animationName = "fadeIn";
    bStyle.animationTimingFunction = "ease-in-out";
    bStyle.animationDuration = "1.5s"
    bStyle.display = "unset"
    broadIndex = getNewPicIndex(broadSources, broadIndex);
}

function displayDoubleImage() {
    video.style.display = "none";
    let bStyle = broadImg.style;
    bStyle.display = "none";
    bStyle.border = "0px";
    bStyle.boxShadow = "";
    broadImg.src = "";
    imageContainer.style.display = "flex";
    infosImg.style.display = "unset";
    infosIndex = getNewPicIndex(infosSources, infosIndex);
    ahadithIndex = getNewPicIndex(ahadithSources, ahadithIndex);
    infosImg.src = infosSources[infosIndex];
    ahadithImg.src = ahadithSources[ahadithIndex];
}

setTimeout(reloadPage, timeUntilMidnight + 60000);


//clock
const degree = 6;
const hr = document.querySelector("#hr")! as HTMLSpanElement
const min = document.querySelector("#min")! as HTMLSpanElement
const sec = document.querySelector("#sec")! as HTMLSpanElement
setInterval(() => {

    const date = new Date();
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * degree
    const ss = date.getSeconds() * degree

    hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`
    sec.style.transform = `rotateZ(${ss}deg)`
})


//Liste bekomme ich von der Moschee auf einem Zettel und muss diese daher einmal monatlich manuell eintragen
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

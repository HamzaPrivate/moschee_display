var now = new Date();
console.log("1. now",now)
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
var timeUntilMidnight = midnight.getTime() - now.getTime();
//
var infosImg = document.getElementById("infos")! as HTMLImageElement;
var ahadithImg = document.getElementById("ahadith")! as HTMLImageElement;
var infosSources = ["infos/ramazan0.jpeg", "infos/ramazan1.jpeg"];
var ahadithSources = ["ahadith/ramazan4.jpeg", "ahadith/ramazan3.jpeg"];
var infosIndex = Math.floor(Math.random() * infosSources.length);
var ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
infosImg.src = infosSources[infosIndex];
ahadithImg.src = ahadithSources[ahadithIndex];

document.querySelector("body")?.addEventListener("click", () => {
    reloadPage();
})

const map = new Map<string, string>();
map.set("Mar 30 2023", "5:07|6:45|13:11|16:42|19:39|21:18");


const prayerTable = document.getElementById("zeiten") as HTMLTableElement;
const prayerTimes = map.get(getFormattedDate("" + now).trim())
console.log("2. getformattedDate",getFormattedDate(now+""));
//injecting prayer times into the table
if (prayerTable && prayerTimes) {
    let splitter = prayerTimes.split("|");
    let cells = prayerTable.rows[1].cells;
    for (let i = 0; i < splitter.length; i++) {
        cells[i].textContent = splitter[i];
    }
}
else console.log("Fehler in der Anzeige der Gebetszeiten.");


setTimeout(reloadPage, timeUntilMidnight + 60000);
setInterval(function () {
    infosIndex = Math.floor(Math.random() * infosSources.length);
    ahadithIndex = Math.floor(Math.random() * ahadithSources.length);
    infosImg.src = infosSources[infosIndex];
    ahadithImg.src = ahadithSources[ahadithIndex];
}, 10000);


//help functions
function reloadPage() { window.location.reload();}
//returns formatted date in Mar 27 2023
function getFormattedDate(date: string): string {
    let fulldate = "" + now;
    let formatted = fulldate.split(/Mon|Tue|Wed|Thu|Fri|Sat|Sun|2023/g);
    console.log("1.5 formatted in datefunction",formatted);
    return formatted[1] + now.getFullYear();
}

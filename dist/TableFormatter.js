"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcTimeTillPrayer = void 0;
const DateFormatter_1 = require("./DateFormatter");
const PrayerTimes_1 = require("./PrayerTimes");
var time = document.getElementById("time");
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const prayerTable = document.getElementById("zeiten");
const date = (0, DateFormatter_1.getFormattedDate)(now);
const prayerTimes = PrayerTimes_1.map.get(date);
//injecting prayer times into the table
if (prayerTable && prayerTimes) {
    let splitter = prayerTimes.split("|");
    let cells = prayerTable.rows[1].cells;
    for (let i = 0; i < splitter.length; i++) {
        cells[i].textContent = splitter[i];
    }
}
else
    throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${prayerTable}, prayerTimes: ${prayerTimes}`);
function calcTimeTillPrayer() {
    var _a;
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    currentDate.setHours(currentHour, currentMinute, 0);
    //find the next prayer time from the given table and set it as the target time
    const targetDate = new Date();
    let cells = prayerTable.rows[1].cells;
    console.log(currentHour);
    for (let i = 0; i < cells.length; i++) {
        let time = (_a = cells[i].textContent) === null || _a === void 0 ? void 0 : _a.split(":");
        cells[i].style.color = "black";
        //display the time in cell red and set it as the target if the time in the cell is the closest to the current time
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
    let todayStr = "" + currentDate;
    //edgecases morning prayer and friday prayer
    if ((currentHour >= 0 && currentHour < 9) || (todayStr.includes("Fri") && currentHour <= 14)) {
        time.textContent = "";
        document.getElementById("text-before-time").textContent = "";
    }
}
exports.calcTimeTillPrayer = calcTimeTillPrayer;

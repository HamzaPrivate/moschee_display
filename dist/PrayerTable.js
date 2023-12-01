"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intiateDatum = exports.calcTimeTillPrayer = exports.initiatePrayerTable = exports.timeUntilMidnight = void 0;
const PrayerTimes_1 = require("./PrayerTimes");
var time = document.getElementById("time");
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
exports.timeUntilMidnight = midnight.getTime() - now.getTime();
const prayerTable = document.getElementsByClassName("namaztime");
var textCol = prayerTable[0].style.color;
/**
* Initializes the prayer table by injecting the corresponding prayer times for the current date.
* If the prayer table and prayer times are available, the function populates the table cells with the times.
* Otherwise, an error is thrown.
*/
function initiatePrayerTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const prayerTimes = yield (0, PrayerTimes_1.getTodaysPrayerTimes)();
        //injecting prayer times into the table
        // console.log(prayerTimes);
        if (prayerTable && prayerTimes) {
            for (let i = 0; i < prayerTimes.length; i++) {
                console.log(prayerTable[i]);
                prayerTable[i].textContent = prayerTimes[i];
            }
        }
        else
            throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${prayerTable}, prayerTimes: ${prayerTimes}`);
    });
}
exports.initiatePrayerTable = initiatePrayerTable;
/**
* Calculates the time remaining until the next prayer based on the current time and the prayer table.
* The function determines the closest prayer time from the table and sets it as the target time.
* It then calculates the time difference between the current time and the target time in hours and minutes.
* The calculated time difference is displayed in the corresponding HTML element.
* Note: The function assumes the presence of HTML elements with IDs: "time" and "text-before-time".
*/
function calcTimeTillPrayer() {
    var _a;
    const currentDate = new Date();
    // console.log(currentDate);
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    currentDate.setHours(currentHour, currentMinute, 0);
    //find the next prayer time from the given table and set it as the target time
    const targetDate = new Date();
    let cells = prayerTable;
    for (let i = 0; i < cells.length; i++) {
        let time = (_a = cells[i].textContent) === null || _a === void 0 ? void 0 : _a.split(":");
        cells[i].style.color = textCol;
        cells[i].parentElement.classList.remove("glass");
        //display the time in cell red and set it as the target if the time in the cell is the closest to the current time
        if (Number(time[0]) > currentHour || (Number(time[0]) == currentHour && Number(time[1]) > currentMinute)) {
            targetDate.setHours(Number(time[0]), Number(time[1]), 0);
            cells[i].style.color = "red";
            cells[i].parentElement.classList.add("glass");
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
function intiateDatum() {
    //TODO: add date
}
exports.intiateDatum = intiateDatum;

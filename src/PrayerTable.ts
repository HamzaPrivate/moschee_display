import { getFormattedDate } from "./DateFormatter";
import { getTodaysPrayerTimes } from "./PrayerTimes";

var time = document.getElementById("time") as HTMLSpanElement;
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
export const timeUntilMidnight = midnight.getTime() - now.getTime();
const prayerTable = document.getElementsByClassName("namaztime") as HTMLCollectionOf<HTMLSpanElement>;
var fajr: string, ishraq: string, dhuhr: string, asr: string, maghrib: string, isha: string;
var textCol = prayerTable[0].style.color;
var isPrayerPinpointed = false;
//var islMitternacht = document.getElementById("islamische-mitternacht")!;


/**
* Initializes the prayer table by injecting the corresponding prayer times for the current date.
* If the prayer table and prayer times are available, the function populates the table cells with the times.
* Otherwise, an error is thrown.
*/
export async function initiatePrayerTable() {
    const prayerTimes = await getTodaysPrayerTimes();
    savePrayerTimes(prayerTimes);
    //injecting prayer times into the table
    // console.log(prayerTimes);
    //islMitternacht.textContent = calculateMiddleTime(prayerTimes[0], prayerTimes[5]);
    if (prayerTable && prayerTimes) {
        //TODO -1 entfernen wenn Frühling
        for (let i = 0; i < prayerTimes.length-1; i++) {
            prayerTable[i].textContent = prayerTimes[i];
        }

        //islMitternacht.textContent = calculateMiddleTime(prayerTimes[4], prayerTimes[0]);
    }

    else throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${prayerTable}, prayerTimes: ${prayerTimes}`);
}

/**
* Calculates the time remaining until the next prayer based on the current time and the prayer table.
* The function determines the closest prayer time from the table and sets it as the target time.
* It then calculates the time difference between the current time and the target time in hours and minutes.
* The calculated time difference is displayed in the corresponding HTML element.
* Note: The function assumes the presence of HTML elements with IDs: "time" and "text-before-time".
*/
export function calcTimeTillPrayer() {
    const currentDate = new Date();
    // console.log(currentDate);
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    currentDate.setHours(currentHour, currentMinute, 0);
    //find the next prayer time from the given table and set it as the target time
    const targetDate = new Date();
    let cells = prayerTable;
    for (let i = 0; i < cells.length; i++) {
        let time = cells[i].textContent?.split(":");
        cells[i].style.color = textCol;
        cells[i].parentElement!.classList.remove("glass");
        //display the time in cell red and set it as the target if the time in the cell is the closest to the current time
        if (Number(time![0]) > currentHour || (Number(time![0]) == currentHour && Number(time![1]) > currentMinute)) {
            targetDate.setHours(Number(time![0]), Number(time![1]), 0);
            cells[i].style.color = "red";
            cells[i].parentElement!.classList.add("glass");
            break;
        }
        else if (i == cells.length - 1) {
            cells[0].style.color = "red";
            cells[0].parentElement!.classList.add("glass");
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
    if ((currentHour >= 0 && currentHour < 9) || (todayStr.includes("Fri") && currentHour <= 14 || time.textContent.trim() == "0min")) {
        time.textContent = "";
        document.getElementById("text-before-time")!.textContent! = "";
    }
}


export function adaptBackground() {
    const bg = document.querySelector("body")!;
    const date = new Date();
    const time = "" + date.getHours()+ "" + date.getMinutes();
    const hours = date.getHours();
    if(time === fajr) {
        bg.style.backgroundImage = "url('pictures/broad/dark.webp')";
        isPrayerPinpointed = true;
    }
    else if(time === ishraq) {
        bg.style.backgroundImage = "url('pictures/broad/early.webp')";
        isPrayerPinpointed = true;
    }
    else if(time === dhuhr || time === asr) {
        bg.style.backgroundImage = "url('pictures/broad/mid.webp')";
        isPrayerPinpointed = true;
    }
    else if(time === maghrib) {
        bg.style.backgroundImage = "url('pictures/broad/late.webp')";
        isPrayerPinpointed = true;
    }
    else if(time === isha) {
        bg.style.backgroundImage = "url('pictures/broad/night.webp')";
        isPrayerPinpointed = true;
    }    
    else if (!isPrayerPinpointed) {
        if (hours >= 0 && hours < 5) {
            bg.style.backgroundImage = "url('pictures/broad/dark.webp')";
        }
        else if (hours >= 5 && hours < 12) {
            bg.style.backgroundImage = "url('pictures/broad/early.webp')";
        }
        else if (hours >= 12 && hours < 20) {
            bg.style.backgroundImage = "url('pictures/broad/mid.webp')";
        }
        else if (hours >= 20 && hours < 22) {
            bg.style.backgroundImage = "url('pictures/broad/late.webp')";
        }
        else if (hours >= 22 && hours < 24) {
            bg.style.backgroundImage = "url('pictures/broad/night.webp')";
        }
    }
}

function savePrayerTimes(prayerTimes: string[]){
    fajr = prayerTimes[0];
    ishraq = prayerTimes[1];
    dhuhr = prayerTimes[2];
    asr = prayerTimes[3];
    maghrib = prayerTimes[4];
    //TODO zu Frühling wieder aktivieren
    //isha = prayerTimes[5];
}
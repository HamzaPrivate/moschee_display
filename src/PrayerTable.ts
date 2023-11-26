import { getFormattedDate } from "./DateFormatter";
import { getTodaysPrayerTimes } from "./PrayerTimes";

var time = document.getElementById("time") as HTMLSpanElement;
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
export const timeUntilMidnight = midnight.getTime() - now.getTime();
const prayerTable = document.getElementById("prayerTable") as HTMLTableElement;



/**
* Initializes the prayer table by injecting the corresponding prayer times for the current date.
* If the prayer table and prayer times are available, the function populates the table cells with the times.
* Otherwise, an error is thrown.
*/
export async function initiatePrayerTable() {
    // const prayerTimes = await getTodaysPrayerTimes();
    // //injecting prayer times into the table
    // console.log(prayerTimes);
    // if (prayerTable && prayerTimes) {
    //     let cells = prayerTable.rows[1].cells;
    //     for (let i = 0; i < prayerTimes.length; i++) {
    //         cells[i].textContent = prayerTimes[i];
    //     }
    // }
    // else throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${prayerTable}, prayerTimes: ${prayerTimes}`);
}


/**
* Calculates the time remaining until the next prayer based on the current time and the prayer table.
* The function determines the closest prayer time from the table and sets it as the target time.
* It then calculates the time difference between the current time and the target time in hours and minutes.
* The calculated time difference is displayed in the corresponding HTML element.
* Note: The function assumes the presence of HTML elements with IDs: "time" and "text-before-time".
*/
export function calcTimeTillPrayer() {
    // const currentDate = new Date();
    // const currentHour = currentDate.getHours();
    // const currentMinute = currentDate.getMinutes();

    // currentDate.setHours(currentHour, currentMinute, 0);
    // //find the next prayer time from the given table and set it as the target time
    // const targetDate = new Date();
    // let cells = prayerTable.rows[1].cells;
    // for (let i = 0; i < cells.length; i++) {
    //     let time = cells[i].textContent?.split(":");
    //     cells[i].style.color = "black";
    //     //display the time in cell red and set it as the target if the time in the cell is the closest to the current time
    //     if (Number(time![0]) > currentHour || (Number(time![0]) == currentHour && Number(time![1]) > currentMinute)) {
    //         targetDate.setHours(Number(time![0]), Number(time![1]), 0);
    //         cells[i].style.color = "red";
    //         break;
    //     }
    // }
    // //calculate time difference
    // const timeDiffMinutes = Math.floor((targetDate.getTime() - currentDate.getTime()) / 60000);
    // const hours = Math.floor(timeDiffMinutes / 60);
    // const minutes = timeDiffMinutes % 60;
    // if (hours == 0) time.textContent = ` ${minutes}min`;
    // else time.textContent = ` ${hours}h:${minutes}min`;
    // let todayStr = "" + currentDate;
    // //edgecases morning prayer and friday prayer
    // if ((currentHour >= 0 && currentHour < 9) || (todayStr.includes("Fri") && currentHour <= 14)) {
    //     time.textContent = "";
    //     document.getElementById("text-before-time")!.textContent! = "";
    // }
}
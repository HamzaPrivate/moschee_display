import { getFormattedDate } from "./DateFormatter";
import { getTodaysPrayerTimes } from "./PrayerTimes";

var time = document.getElementById("time") as HTMLSpanElement;
var now = new Date();
var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
export const timeUntilMidnight = midnight.getTime() - now.getTime();
const prayerTable = document.getElementsByClassName("namaztime") as HTMLCollectionOf<HTMLSpanElement>;
var textCol = prayerTable[0].style.color;
//var islMitternacht = document.getElementById("islamische-mitternacht")!;


/**
* Initializes the prayer table by injecting the corresponding prayer times for the current date.
* If the prayer table and prayer times are available, the function populates the table cells with the times.
* Otherwise, an error is thrown.
*/
export async function initiatePrayerTable() {
    const prayerTimes = await getTodaysPrayerTimes();
    //injecting prayer times into the table
    // console.log(prayerTimes);
    //islMitternacht.textContent = calculateMiddleTime(prayerTimes[0], prayerTimes[5]);
    if (prayerTable && prayerTimes) {
        for (let i = 0; i < prayerTimes.length; i++) {
            prayerTable[i].textContent = prayerTimes[i];
        }

        //islMitternacht.textContent = calculateMiddleTime(prayerTimes[4], prayerTimes[0]);
    }

    else throw new Error(`Fehler in der Gebetszeitentabelle. prayerTable:${prayerTable}, prayerTimes: ${prayerTimes}`);
}

//function calculateMiddleTime(time1: string, time2: string) {
//     // Create a base date for calculations (ignoring the year, month, and day)
//     const baseDate = new Date(2000, 0, 1);

//     // Parse the time strings and set them on the base date
//     const [hours1, minutes1] = time1.split(':');
//     const [hours2, minutes2] = time2.split(':');

//     let date1 = new Date(baseDate);
//     date1.setHours(Number(hours1), Number(minutes1), 0);

//     let date2 = new Date(baseDate);
//     date2.setHours(Number(hours2), Number(minutes2), 0);

//     // Check if the second time is earlier than the first one
//     if (date2 < date1) {
//         date2.setDate(date2.getDate() + 1); // Add one day to the second time
//     }

//     // Calculate the average time in milliseconds
//     const averageTimeInMilliseconds = (date1.getTime() + date2.getTime()) / 2;

//     // Create a new Date object with the average time
//     const middleTime = new Date(averageTimeInMilliseconds);

//     // Format the result as a time string (HH:mm)
//     const formattedMiddleTime = middleTime.toTimeString().slice(0, 5);

//     return formattedMiddleTime;
// }

// // Example usage:
// const time1 = "15:57";
// const time2 = "6:11";

// const middleTime = calculateMiddleTime(time1, time2);

// console.log("Middle Time:", middleTime);


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
    if ((currentHour >= 0 && currentHour < 9) || (todayStr.includes("Fri") && currentHour <= 14)) {
        time.textContent = "";
        document.getElementById("text-before-time")!.textContent! = "";
    }
}


export function adaptBackground() {
    const bg = document.querySelector("body")!.classList;
    const time = new Date();
    const hour = time.getHours();
    if(hour >= 0 && hour < 6) {
        bg.remove("day");
        bg.remove("sunrise");
        bg.remove("night");
        bg.add("night");
    }
    else if(hour >= 6 && hour < 12) {
        bg.remove("day");
        bg.remove("sunrise");
        bg.remove("night");
        bg.add("sunrise");
    }
    else if(hour >= 12 && hour < 18) {
        bg.remove("day");
        bg.remove("sunrise");
        bg.remove("night");
        bg.add("day");
    }
    else if(hour >= 18 && hour < 24) {
        bg.remove("day");
        bg.remove("sunrise");
        bg.remove("night");
        bg.add("night");
    }
}
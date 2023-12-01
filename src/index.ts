import * as MMD from './ResourceDisplayer';
import { adaptBackground, calcTimeTillPrayer, initiatePrayerTable, timeUntilMidnight } from './PrayerTable';
import { time } from 'console';
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();
document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
  }, false);
//page reload on table click
document.querySelector("table")?.addEventListener("click", () => {
    window.location.reload();
})
//page reload upon midnight+1min
setTimeout(() => window.location.reload(), timeUntilMidnight + 60000);

const digit1 = document.querySelector("#digit1");
const timeText = document.querySelector("#time_text");



main();

async function main() {
    MMD.videoComing()? MMD.displayVideo(): MMD.displayBroadImage();
    await initiatePrayerTable();
    initiateDatum();
    calcTimeTillPrayer();
    adaptBackground();
    setInterval(()=> {
        MMD.displayNextResource();
        calcTimeTillPrayer();
        adaptBackground();
    }, 60000);//60000

    setInterval(()=> {
        //increment time
        const date = new Date();
        const seconds = date.getSeconds();
        if(seconds == 0) {
            const minutes = date.getMinutes();
            timeText!.textContent = `${addZero(date.getHours())}:${addZero(minutes)}`;
            if(minutes == 0) {
                const hours = date.getHours();
                timeText!.textContent = `${addZero(hours)}:${addZero(minutes)}`;
            }    
        }

        digit1!.textContent = `${addZero(date.getSeconds())}`;
    }, 1000);//60000
    if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
        try {
            await navigator.wakeLock.request('screen');
        } catch(err) {
           console.log(err);
        }
    } else {
        console.warn('Wake Lock API or request method is not supported in this browser.');
    }

}

function initiateDatum(){
    const date = new Date();
    timeText!.textContent = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    const datumText = document.querySelector("#bt-bot-line");
    datumText!.textContent = `${mapToBosnianDay(date.toLocaleString('default', { weekday: 'long' }))} - ${date.getDate()}. ${mapToBosnianMonth(date.toLocaleString('default', { month: 'long' }))}`;

}

function mapToBosnianMonth(month: string): string {
    switch (month) {
        case "Januar": return "Januar";
        case "Februar": return "Februar";
        case "März": return "Mart";
        case "April": return "April";
        case "Mai": return "Maj";
        case "Juni": return "Juni";
        case "Juli": return "Juli";
        case "August": return "August";
        case "September": return "Septembar";
        case "Oktober": return "Oktobar";
        case "November": return "Novembar";
        case "Dezember": return "Decembar";
        default: return "";
    }
}

function mapToBosnianDay(day: string): string {
    switch (day) {
        case "Montag": return "Ponedjeljak";
        case "Dienstag": return "Utorak";
        case "Mittwoch": return "Srijeda";
        case "Donnerstag": return "Četvrtak";
        case "Freitag": return "Petak";
        case "Samstag": return "Subota";
        case "Sonntag": return "Nedjelja";
        default: return "";
    }
}

function addZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
}
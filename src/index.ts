import {
  adaptBackground,
  calcTimeTillPrayer,
  initiatePrayerTable,
  timeUntilMidnight,
} from "./PrayerTable";
import * as MMD from "./ResourceDisplayer";
import { addZero } from "./Utility";

//page reload on table click
document.querySelector("table")?.addEventListener("click", () => {
  window.location.reload();
});
//page reload upon midnight+1min
setTimeout(() => window.location.reload(), timeUntilMidnight + 60000);

const digit1 = document.querySelector("#digit1");
const timeText = document.querySelector("#time_text");

main();

async function main() {
  await MMD.fetchPictures();
  MMD.videoComing() ? MMD.displayVideo() : MMD.displayBroadImage();
  await initiatePrayerTable();
  initiateDatum();
  calcTimeTillPrayer();
  adaptBackground();
  setInterval(() => {
    MMD.displayNextResource();
    calcTimeTillPrayer();
    adaptBackground();
  }, 60000); //60000

  setInterval(() => {
    //increment time
    const date = new Date();
    const seconds = date.getSeconds();
    if (seconds == 0) {
      const minutes = date.getMinutes();
      timeText!.textContent = `${addZero(date.getHours())}:${addZero(minutes)}`;
      if (minutes == 0) {
        const hours = date.getHours();
        timeText!.textContent = `${addZero(hours)}:${addZero(minutes)}`;
      }
    }

    digit1!.textContent = `${addZero(date.getSeconds())}`;
  }, 1000); //60000
}

function initiateDatum() {
  const date = new Date();
  timeText!.textContent = `${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}`;
  const datumText = document.querySelector("#bt-bot-line");
  datumText!.textContent = `${mapToBosnianDay(
    date.toLocaleString("default", { weekday: "long" })
  )} - ${date.getDate()}. ${mapToBosnianMonth(
    date.toLocaleString("default", { month: "long" })
  )}`;
}

function mapToBosnianMonth(month: string): string {
  switch (month) {
    case "Januar":
    case "January":
      return "Januar";
    case "Februar":
    case "February":
      return "Februar";
    case "März":
    case "March":
      return "Mart";
    case "April":
      return "April";
    case "Mai":
    case "May":
      return "Maj";
    case "Juni":
    case "June":
      return "Juni";
    case "Juli":
    case "July":
      return "Juli";
    case "August":
      return "August";
    case "September":
      return "Septembar";
    case "Oktober":
    case "October":
      return "Oktobar";
    case "November":
      return "Novembar";
    case "Dezember":
    case "December":
      return "Decembar";
    default:
      return "";
  }
}

function mapToBosnianDay(day: string): string {
  switch (day) {
    case "Montag":
    case "Monday":
      return "Ponedjeljak";
    case "Dienstag":
    case "Tuesday":
      return "Utorak";
    case "Mittwoch":
    case "Wednesday":
      return "Srijeda";
    case "Donnerstag":
    case "Thursday":
      return "Četvrtak";
    case "Freitag":
    case "Friday":
      return "Petak";
    case "Samstag":
    case "Saturday":
      return "Subota";
    case "Sonntag":
    case "Sunday":
      return "Nedjelja";
    default:
      return "";
  }
}

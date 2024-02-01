"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const MMD = __importStar(require("./ResourceDisplayer"));
const PrayerTable_1 = require("./PrayerTable");
const nosleep_js_1 = __importDefault(require("nosleep.js"));
var noSleep = new nosleep_js_1.default();
document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
}, false);
//page reload on table click
(_a = document.querySelector("table")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    window.location.reload();
});
//page reload upon midnight+1min
setTimeout(() => window.location.reload(), PrayerTable_1.timeUntilMidnight + 60000);
const digit1 = document.querySelector("#digit1");
const timeText = document.querySelector("#time_text");
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        MMD.videoComing() ? MMD.displayVideo() : MMD.displayBroadImage();
        yield (0, PrayerTable_1.initiatePrayerTable)();
        initiateDatum();
        (0, PrayerTable_1.calcTimeTillPrayer)();
        (0, PrayerTable_1.adaptBackground)();
        setInterval(() => {
            MMD.displayNextResource();
            (0, PrayerTable_1.calcTimeTillPrayer)();
            (0, PrayerTable_1.adaptBackground)();
        }, 60000); //60000
        setInterval(() => {
            //increment time
            const date = new Date();
            const seconds = date.getSeconds();
            if (seconds == 0) {
                const minutes = date.getMinutes();
                timeText.textContent = `${addZero(date.getHours())}:${addZero(minutes)}`;
                if (minutes == 0) {
                    const hours = date.getHours();
                    timeText.textContent = `${addZero(hours)}:${addZero(minutes)}`;
                }
            }
            digit1.textContent = `${addZero(date.getSeconds())}`;
        }, 1000); //60000
        if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
            try {
                yield navigator.wakeLock.request('screen');
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            console.warn('Wake Lock API or request method is not supported in this browser.');
        }
    });
}
function initiateDatum() {
    const date = new Date();
    timeText.textContent = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    const datumText = document.querySelector("#bt-bot-line");
    datumText.textContent = `${mapToBosnianDay(date.toLocaleString('default', { weekday: 'long' }))} - ${date.getDate()}. ${mapToBosnianMonth(date.toLocaleString('default', { month: 'long' }))}`;
}
function mapToBosnianMonth(month) {
    switch (month) {
        case "Januar":
        case "January": return "Januar";
        case "Februar":
        case "February": return "Februar";
        case "März":
        case "March": return "Mart";
        case "April": return "April";
        case "Mai":
        case "May": return "Maj";
        case "Juni":
        case "June": return "Juni";
        case "Juli":
        case "July": return "Juli";
        case "August": return "August";
        case "September": return "Septembar";
        case "Oktober":
        case "October": return "Oktobar";
        case "November": return "Novembar";
        case "Dezember":
        case "December": return "Decembar";
        default: return "";
    }
}
function mapToBosnianDay(day) {
    switch (day) {
        case "Montag":
        case "Monday": return "Ponedjeljak";
        case "Dienstag":
        case "Tuesday": return "Utorak";
        case "Mittwoch":
        case "Wednesday": return "Srijeda";
        case "Donnerstag":
        case "Thursday": return "Četvrtak";
        case "Freitag":
        case "Friday": return "Petak";
        case "Samstag":
        case "Saturday": return "Subota";
        case "Sonntag":
        case "Sunday": return "Nedjelja";
        default: return "";
    }
}
function addZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

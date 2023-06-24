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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const MMD = __importStar(require("./ResourceDisplayer"));
const PrayerTable_1 = require("./PrayerTable");
//page reload on table click
(_a = document.querySelector("table")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    window.location.reload();
});
//page reload upon midnight+1min
setTimeout(() => window.location.reload(), PrayerTable_1.timeUntilMidnight + 60000);
//starts displaying here
if (MMD.videoComing())
    MMD.displayVideo();
else
    MMD.displayBroadImage();
(0, PrayerTable_1.calcTimeTillPrayer)();
setInterval(function () {
    MMD.displayNextResource();
    (0, PrayerTable_1.calcTimeTillPrayer)();
}, 60000); //60000
//clock
const degree = 6;
const hr = document.querySelector("#hr");
const min = document.querySelector("#min");
const sec = document.querySelector("#sec");
setInterval(() => {
    const date = new Date();
    const hh = date.getHours() * 30;
    const mm = date.getMinutes() * degree;
    const ss = date.getSeconds() * degree;
    hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
    min.style.transform = `rotateZ(${mm}deg)`;
    sec.style.transform = `rotateZ(${ss}deg)`;
});

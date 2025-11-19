"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToTime = exports.addZero = void 0;
function addZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
exports.addZero = addZero;
function addMinutesToTime(time, minutesToAdd) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    const newHours = date.getHours();
    const newMinutes = date.getMinutes();
    return newHours + ":" + addZero(newMinutes);
}
exports.addMinutesToTime = addMinutesToTime;

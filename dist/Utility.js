"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addZero = void 0;
function addZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
exports.addZero = addZero;

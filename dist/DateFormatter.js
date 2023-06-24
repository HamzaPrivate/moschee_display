"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDate = void 0;
/**
 *
 * @param date as in new Date()
 * @returns formatted date as in 27 5 2023
 */
function getFormattedDate(date) {
    return `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`;
}
exports.getFormattedDate = getFormattedDate;

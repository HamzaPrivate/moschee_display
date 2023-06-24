/**
 * 
 * @param date as in new Date()
 * @returns formatted date as in 27 5 2023
 */
export function getFormattedDate(date: Date) {
    return `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`;
}

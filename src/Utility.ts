export function addZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
}

export function addMinutesToTime(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    const newHours = date.getHours();
    const newMinutes = date.getMinutes();
    return newHours + ":" + addZero(newMinutes);
}
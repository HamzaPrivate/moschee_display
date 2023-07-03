import * as MMD from './ResourceDisplayer';
import { calcTimeTillPrayer, initiatePrayerTable, timeUntilMidnight } from './PrayerTable';

//page reload on table click
document.querySelector("table")?.addEventListener("click", () => {
    window.location.reload();
})
//page reload upon midnight+1min
setTimeout(() => window.location.reload(), timeUntilMidnight + 60000);

main();

async function main() {
    MMD.videoComing()? MMD.displayVideo(): MMD.displayBroadImage();
    await initiatePrayerTable();
    calcTimeTillPrayer();

    setInterval(()=> {
        MMD.displayNextResource();
        calcTimeTillPrayer();
    }, 60000);//60000

    //clock
    const degree = 6;
    const hr = document.querySelector("#hr")! as HTMLSpanElement
    const min = document.querySelector("#min")! as HTMLSpanElement
    const sec = document.querySelector("#sec")! as HTMLSpanElement
    setInterval(() => {

        const date = new Date();
        const hh = date.getHours() * 30;
        const mm = date.getMinutes() * degree
        const ss = date.getSeconds() * degree

        hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
        min.style.transform = `rotateZ(${mm}deg)`
        sec.style.transform = `rotateZ(${ss}deg)`
    })
}

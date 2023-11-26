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

    // setInterval(()=> {
    //     MMD.displayNextResource();
    //     calcTimeTillPrayer();
    // }, 60000);//60000

}

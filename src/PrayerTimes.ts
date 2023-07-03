import { getFormattedDate } from "./DateFormatter";

export async function getTodaysPrayerTimes(): Promise<string[]> {
    try {
      const response = await fetch('PrayerTimes.json');
      const data = await response.json();
      const currentDate = new Date();
      const today = getFormattedDate(currentDate);
      if (data.hasOwnProperty(today)) {
        const prayerTimes = data[today].split('|');
        // Perform any further actions with the prayer times for today
        return prayerTimes;
      } else {
        console.log('Prayer times for today are not available.');
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  
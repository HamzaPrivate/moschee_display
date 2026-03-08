import { getFormattedDate } from "./DateFormatter";

export var dzuma = "14:00"

export async function getTodaysPrayerTimes(): Promise<string[]> {
    try {
      const url =
      'https://cbbvkyvplqopcnlaabex.supabase.co/storage/v1/object/public/prayertimes/PrayerTimes.json';
    const response = await fetch(`${url}?t=${Date.now()}`, {
      headers: {
        method: 'GET',
        cache: 'no-store',
      },
    });      
    const data = await response.json();
      const currentDate = new Date();
      const today = getFormattedDate(currentDate);
      if (data.hasOwnProperty(today)) {
        const prayerTimes = data[today].split('|');
        // Perform any further actions with the prayer times for today
        if(data.hasOwnProperty("dzuma")){
          dzuma = data["dzuma"]
        }
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
  
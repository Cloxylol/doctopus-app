import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

export async function addEventToCalendar({ title, notes, startDate, endDate }) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission refusée pour accéder au calendrier');
  }

  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendar = calendars.find(
    (cal) => cal.allowsModifications && cal.source?.name !== 'Birthday'
  );

  if (!defaultCalendar) {
    throw new Error('Aucun calendrier modifiable disponible');
  }

  const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
    title,
    notes,
    startDate,
    endDate,
    timeZone: 'Europe/Paris',
  });

  return eventId;
}

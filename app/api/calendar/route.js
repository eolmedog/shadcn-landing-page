import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';

// Path to your service account JSON file
const KEYFILEPATH = path.join(process.cwd(), 'config', 'google-service-account.json');

// Your Google Calendar ID (use your email if it's the primary calendar)
const CALENDAR_ID = 'enrique@automatizalofome.cl';

// Define working hours
const WORK_HOURS = { start: 9, end: 17 }; // 9 AM - 5 PM

// Define appointment duration (in minutes)
const APPOINTMENT_DURATION = 30;

export async function GET() {
  try {
    // Authenticate with the service account
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const start = new Date();
    start.setHours(start.getHours() + 4);
    const end_date = new Date();
    end_date.setDate(end_date.getDate() + 2);

    // Fetch Free/Busy times from Google Calendar
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: start.toISOString(),
        timeMax: end_date.toISOString(),
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busyTimes = freeBusyResponse.data.calendars[CALENDAR_ID]?.busy || [];

    // Generate available slots
    const availableSlots = getAvailableSlots(start, end_date, busyTimes);

    return NextResponse.json({ availableSlots }, { status: 200 });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Error fetching availability' }, { status: 500 });
  }
}

// Function to calculate available slots
function getAvailableSlots(startDate, endDate, busyTimes) {
  let availableSlots = [];

  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    let workDayStart = new Date(currentDate);
    workDayStart.setHours(WORK_HOURS.start, 0, 0, 0);

    let workDayEnd = new Date(currentDate);
    workDayEnd.setHours(WORK_HOURS.end, 0, 0, 0);

    let availableTime = getFreeTimeSlots(workDayStart, workDayEnd, busyTimes);
    availableSlots.push(...availableTime);

    currentDate.setDate(currentDate.getDate() + 1); // Move to next day
  }

  return availableSlots;
}

// Function to compute free slots between busy times
function getFreeTimeSlots(dayStart, dayEnd, busyTimes) {
  let slots = [];
  let startTime = new Date(dayStart);

  for (let busy of busyTimes) {
    let busyStart = new Date(busy.start);
    let busyEnd = new Date(busy.end);

    if (busyStart < startTime) {
      startTime = busyEnd; // Skip past this busy period
      continue;
    }

    while (startTime < busyStart) {
      let slotEnd = new Date(startTime.getTime() + APPOINTMENT_DURATION * 60000);

      if (slotEnd > busyStart) break;
      if (slotEnd > dayEnd) break;

      slots.push({ start: startTime.toISOString(), end: slotEnd.toISOString() });
      startTime = new Date(slotEnd);
    }

    startTime = new Date(busyEnd);
  }

  // Add last free slot if available
  while (startTime < dayEnd) {
    let slotEnd = new Date(startTime.getTime() + APPOINTMENT_DURATION * 60000);
    if (slotEnd > dayEnd) break;

    slots.push({ start: startTime.toISOString(), end: slotEnd.toISOString() });
    startTime = new Date(slotEnd);
  }

  return slots;
}

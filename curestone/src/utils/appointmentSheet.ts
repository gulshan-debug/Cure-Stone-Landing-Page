// Utility to send appointment data to Google Sheets via webhook (Zapier/Make/Apps Script)
export interface AppointmentData {
  name: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
}

// Replace with your webhook URL
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL!;

export async function sendAppointmentToSheet(data: AppointmentData) {
  if (!GOOGLE_SHEET_WEBHOOK_URL) throw new Error('GOOGLE_SHEET_WEBHOOK_URL not set');
  const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send appointment to Google Sheet');
  return await res.json();
}

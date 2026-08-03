/**
 * Outlets. One store today — the "opening soon" slot is driven by the
 * @chatimesrilanka campaign asking followers where Chatime should open next.
 *
 * `coords` for Havelock City Mall are the mall's own coordinates, accurate to
 * the building. Replace `phone` once the store publishes one (Google currently
 * lists no number for it).
 */

export type Outlet = {
  slug: string;
  name: string;
  area: string;
  address: string;
  floor?: string;
  coords: { lat: number; lng: number };
  mapsUrl: string;
  phone?: string;
  /** 0 = Sunday. Times in 24h local. */
  hours: { open: string; close: string }[];
  rating?: { score: number; count: number };
  deliveryUrl?: string;
  status: 'open' | 'coming-soon';
};

export const outlets: Outlet[] = [
  {
    slug: 'havelock-city-mall',
    name: 'Chatime Havelock City Mall',
    area: 'Colombo 05',
    address: '21 Havelock Drive, Colombo 00500',
    floor: 'Level 2',
    coords: { lat: 6.8867, lng: 79.8672 },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chatime+Havelock+City+Mall+Colombo',
    hours: [
      { open: '10:00', close: '22:00' }, // Sun
      { open: '10:00', close: '22:00' }, // Mon
      { open: '10:00', close: '22:00' }, // Tue
      { open: '10:00', close: '22:00' }, // Wed
      { open: '10:00', close: '22:00' }, // Thu
      { open: '10:00', close: '22:00' }, // Fri
      { open: '10:00', close: '22:00' }, // Sat
    ],
    // ⚠️ The Google listing was pasted as "4.247 Google reviews", which is
    // ambiguous — most likely 4.2 stars from 247 reviews. Confirm on Google
    // Maps before this goes live, or delete `rating` to stop showing it.
    rating: { score: 4.2, count: 247 },
    deliveryUrl:
      'https://www.ubereats.com/lk/store/chatime-colombo-05/HegPZA3dV0uuwsskhh8_2A',
    status: 'open',
  },
];

export const WHATSAPP_NUMBER = ''; // e.g. '94771234567' — enables the WhatsApp order handoff
export const INSTAGRAM_URL = 'https://www.instagram.com/chatimesrilanka/';

function minutesSinceMidnight(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Colombo is UTC+5:30 year-round, so we compute the local time explicitly
 * rather than trusting the visitor's clock — someone browsing from London
 * should still see whether the Havelock store is open *there*.
 */
export function colomboNow(now: Date = new Date()): { day: number; minutes: number } {
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const colombo = new Date(utc + 5.5 * 60 * 60_000);
  return { day: colombo.getDay(), minutes: colombo.getHours() * 60 + colombo.getMinutes() };
}

/**
 * Deliberately returns a *structured* descriptor rather than a finished
 * sentence. The site runs in English, Sinhala and Tamil, so the wording has to
 * come from the dictionary at render time — building "Closes 10 PM" here would
 * hard-code English into a trilingual page. Use `formatOpenState` to render it.
 */
export type OpenState =
  | { kind: 'coming-soon'; isOpen: false }
  | { kind: 'closes-in'; isOpen: true; minutes: number }
  | { kind: 'closes-at'; isOpen: true; time: string }
  | { kind: 'opens-at'; isOpen: false; time: string }
  | { kind: 'opens-on'; isOpen: false; time: string; day: number };

export function openState(outlet: Outlet, now: Date = new Date()): OpenState {
  if (outlet.status === 'coming-soon') return { kind: 'coming-soon', isOpen: false };

  const { day, minutes } = colomboNow(now);
  const today = outlet.hours[day];
  const openM = minutesSinceMidnight(today.open);
  const closeM = minutesSinceMidnight(today.close);

  if (minutes >= openM && minutes < closeM) {
    const until = closeM - minutes;
    return until <= 60
      ? { kind: 'closes-in', isOpen: true, minutes: until }
      : { kind: 'closes-at', isOpen: true, time: today.close };
  }

  if (minutes < openM) return { kind: 'opens-at', isOpen: false, time: today.open };

  const nextDay = (day + 1) % 7;
  return {
    kind: 'opens-on',
    isOpen: false,
    time: outlet.hours[nextDay].open,
    day: nextDay,
  };
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/** True when every day of the week keeps the same hours. */
export function hasUniformHours(outlet: Outlet): boolean {
  const first = outlet.hours[0];
  return outlet.hours.every((h) => h.open === first.open && h.close === first.close);
}

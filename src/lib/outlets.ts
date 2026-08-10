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

/**
 * The store's WhatsApp, in the international form wa.me needs: country code, no
 * leading zero, no punctuation. Local 078 301 1543 becomes 9478301 1543.
 * Setting this is what switches online ordering on — checkout falls back to a
 * "not switched on yet" notice while it is empty.
 */
export const WHATSAPP_NUMBER = '94783011543';
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

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

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

/** "Open now · Closes 10 PM", the short line under the status pill. */
export function formatOpenState(state: OpenState): string {
  switch (state.kind) {
    case 'coming-soon':
      return 'Watch this space';
    case 'closes-in':
      return `Closes in ${state.minutes} min`;
    case 'closes-at':
      return `Closes ${formatTime(state.time)}`;
    case 'opens-at':
      return `Opens ${formatTime(state.time)}`;
    case 'opens-on':
      return `Opens ${formatTime(state.time)} ${DAY_NAMES[state.day]}`;
  }
}

/** Collapses the week into "Every day · 10 AM – 10 PM" when the hours are uniform. */
export function hoursSummary(outlet: Outlet): string {
  const first = outlet.hours[0];
  const uniform = outlet.hours.every(
    (h) => h.open === first.open && h.close === first.close,
  );
  if (uniform) return `Every day · ${formatTime(first.open)} – ${formatTime(first.close)}`;
  return outlet.hours
    .map((h, i) => `${DAY_NAMES[i].slice(0, 3)} ${formatTime(h.open)}–${formatTime(h.close)}`)
    .join(' · ');
}

import type { Dictionary } from './dictionaries';
import { formatTime, hasUniformHours, type OpenState, type Outlet } from '@/lib/outlets';

function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}

/** Turns the structured open/closed descriptor into a sentence in the active language. */
export function formatOpenState(state: OpenState, t: Dictionary): string {
  switch (state.kind) {
    case 'coming-soon':
      return t.locations.watchThisSpace;
    case 'closes-in':
      return fill(t.locations.closesInMinutes, { minutes: state.minutes });
    case 'closes-at':
      return fill(t.locations.closesAt, { time: formatTime(state.time) });
    case 'opens-at':
      return fill(t.locations.opensAt, { time: formatTime(state.time) });
    case 'opens-on':
      return fill(t.locations.opensOn, {
        time: formatTime(state.time),
        day: t.days[state.day],
      });
  }
}

/** "Every day · 10 AM – 10 PM", or a per-day list when the hours vary. */
export function formatHoursSummary(outlet: Outlet, t: Dictionary): string {
  const first = outlet.hours[0];
  if (hasUniformHours(outlet)) {
    return `${t.locations.everyDay} · ${formatTime(first.open)} – ${formatTime(first.close)}`;
  }
  return outlet.hours
    .map((h, i) => `${t.days[i]} ${formatTime(h.open)}–${formatTime(h.close)}`)
    .join(' · ');
}

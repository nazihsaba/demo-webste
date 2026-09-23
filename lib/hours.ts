import type { OpeningHour } from "./types";

/**
 * Opening hours as Google returns them: "7 AM–1 AM", "8 am–11 pm",
 * "7:30 am–1 am", "12–3 PM, 6–11 PM", "Open 24 hours", "Closed".
 * Pure functions, safe to run on the server or in the browser.
 */

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Range = { open: number; close: number }; // minutes from midnight; close may exceed 1440

/** "7 am–1 am" -> "7 AM – 1 AM" */
export function tidyHours(text: string): string {
  return text
    .replace(/[\u202f\u00a0]/g, " ")
    .replace(/\s*[–—-]\s*/g, " – ")
    .replace(/\b(a|p)\.?m\.?\b/gi, (m) => m.replace(/\./g, "").toUpperCase())
    .trim();
}

/** Monday first, one row per day, no duplicates. */
export function normalizeWeek(list?: OpeningHour[]): OpeningHour[] | undefined {
  if (!list?.length) return undefined;
  const byDay = new Map<string, string>();
  for (const row of list) {
    const day = DAYS.find((d) => d.toLowerCase() === String(row.day).trim().toLowerCase());
    if (day && row.hours) byDay.set(day, tidyHours(String(row.hours)));
  }
  if (byDay.size === 0) return undefined;
  return DAYS.filter((d) => byDay.has(d)).map((d) => ({ day: d, hours: byDay.get(d)! }));
}

/** Seven identical days become one "Every day" row. */
export function collapseWeek(week?: OpeningHour[]): { label: string; hours: string }[] {
  if (!week?.length) return [];
  const same = week.length === 7 && week.every((d) => d.hours === week[0].hours);
  if (same) return [{ label: "Every day", hours: week[0].hours }];
  return week.map((d) => ({ label: d.day, hours: d.hours }));
}

function parseTime(raw: string, fallbackSuffix?: string): number | null {
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2] ?? 0);
  const suffix = (m[3] ?? fallbackSuffix)?.toUpperCase();
  if (suffix === "AM" && h === 12) h = 0;
  if (suffix === "PM" && h !== 12) h += 12;
  if (h > 24 || min > 59) return null;
  return h * 60 + min;
}

/** Returns the open ranges for one day, "closed", or "allday". */
export function parseDay(text: string): Range[] | "closed" | "allday" | null {
  const t = tidyHours(text).toLowerCase();
  if (!t) return null;
  if (t.includes("24 hours")) return "allday";
  if (t.startsWith("closed")) return "closed";

  const ranges: Range[] = [];
  for (const part of tidyHours(text).split(",")) {
    const [a, b] = part.split(" – ");
    if (!a || !b) continue;
    const suffixB = b.match(/(AM|PM)/i)?.[1];
    const close = parseTime(b);
    const open = parseTime(a, suffixB);
    if (open === null || close === null) continue;
    ranges.push({ open, close: close <= open ? close + 1440 : close });
  }
  return ranges.length ? ranges : null;
}

export function formatMinutes(total: number): string {
  const m = ((total % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const min = m % 60;
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return min ? `${h12}:${String(min).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

/** Current day and time in Lebanon, whatever the visitor's own timezone. */
export function beirutNow(date = new Date()): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Beirut",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = DAYS.indexOf(get("weekday") as (typeof DAYS)[number]);
  return { dayIndex, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenState = { open: boolean; label: string };

/** "Open now until 1 AM" or "Closed now, opens 8 AM". Null when we can't tell. */
export function statusFor(week: OpeningHour[] | undefined, now = beirutNow()): OpenState | null {
  if (!week?.length || now.dayIndex < 0) return null;
  const hoursFor = (i: number) => week.find((d) => d.day === DAYS[(i + 7) % 7])?.hours;

  const today = hoursFor(now.dayIndex);
  const yesterday = hoursFor(now.dayIndex - 1);
  if (!today) return null;

  const t = parseDay(today);
  const y = yesterday ? parseDay(yesterday) : null;
  if (t === null) return null;

  if (t === "allday") return { open: true, label: "Open now, 24 hours" };

  // Still inside last night's late shift?
  if (Array.isArray(y)) {
    const spill = y.find((r) => r.close > 1440 && now.minutes < r.close - 1440);
    if (spill) return { open: true, label: `Open now until ${formatMinutes(spill.close)}` };
  }

  if (Array.isArray(t)) {
    const current = t.find((r) => now.minutes >= r.open && now.minutes < r.close);
    if (current) return { open: true, label: `Open now until ${formatMinutes(current.close)}` };
    const later = t.find((r) => r.open > now.minutes);
    if (later) return { open: false, label: `Closed now, opens ${formatMinutes(later.open)}` };
  }

  for (let i = 1; i <= 7; i++) {
    const next = hoursFor(now.dayIndex + i);
    const p = next ? parseDay(next) : null;
    if (p === "allday") return { open: false, label: `Closed now, opens ${DAYS[(now.dayIndex + i) % 7]}` };
    if (Array.isArray(p) && p.length) {
      const when = i === 1 ? "tomorrow" : DAYS[(now.dayIndex + i) % 7];
      return { open: false, label: `Closed now, opens ${when} ${formatMinutes(p[0].open)}` };
    }
  }
  return { open: false, label: "Closed now" };
}

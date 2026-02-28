"use client";

import { useState, useMemo, useCallback } from "react";
import { createT, getArray } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";
import {
  cn,
  daysBetween,
  isSameDay,
  parseLocalDate,
  toDateString,
  isDateInRange,
} from "@/lib/utils";
import availabilityData from "@/data/availability.json";

interface AvailabilityCalendarProps {
  locale: Locale;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectCheckIn: (d: Date) => void;
  onSelectCheckOut: (d: Date) => void;
  onClear: () => void;
}

/* ────────────────────────────────────────────────────────────── */

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday = 0 ... Sunday = 6 (ISO weekday, not JS default) */
function isoWeekday(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}`;
}

/* ────────────────────────────────────────────────────────────── */

export default function AvailabilityCalendar({
  locale,
  checkIn,
  checkOut,
  onSelectCheckIn,
  onSelectCheckOut,
  onClear,
}: AvailabilityCalendarProps) {
  const t = createT(locale);
  const monthNames = getArray(locale, "booking.months") as string[];
  const weekdays = getArray(locale, "booking.weekdays_short") as string[];

  /* ── Parse availability ─────────────────────────────────── */
  const seasonOpen = useMemo(
    () => parseLocalDate(availabilityData.season_open),
    [],
  );
  const seasonClose = useMemo(
    () => parseLocalDate(availabilityData.season_close),
    [],
  );
  const blockedDates = useMemo(
    () => new Set<string>(availabilityData.blocked_dates),
    [],
  );
  const minNights = availabilityData.min_nights ?? siteConfig.minNights;

  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  /* ── Current visible month ──────────────────────────────── */
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const so = startOfMonth(seasonOpen);
    const now = startOfMonth(today);
    return so.getTime() > now.getTime() ? so : now;
  });

  /* ── Navigation helpers ─────────────────────────────────── */
  const canGoPrev = useMemo(() => {
    const prev = addMonths(currentMonth, -1);
    const earliest = startOfMonth(
      seasonOpen.getTime() > today.getTime() ? seasonOpen : today,
    );
    return prev.getTime() >= earliest.getTime();
  }, [currentMonth, seasonOpen, today]);

  const canGoNext = useMemo(() => {
    const next = addMonths(currentMonth, 1);
    return next.getTime() <= startOfMonth(seasonClose).getTime();
  }, [currentMonth, seasonClose]);

  const goPrev = useCallback(() => {
    if (canGoPrev) setCurrentMonth((m) => addMonths(m, -1));
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (canGoNext) setCurrentMonth((m) => addMonths(m, 1));
  }, [canGoNext]);

  /* ── Range-contains-blocked helper ──────────────────────── */
  const rangeHasBlocked = useCallback(
    (start: Date, end: Date): boolean => {
      const d = new Date(start);
      while (d <= end) {
        if (blockedDates.has(toDateString(d))) return true;
        d.setDate(d.getDate() + 1);
      }
      return false;
    },
    [blockedDates],
  );

  /* ── Day click logic ────────────────────────────────────── */
  const handleDayClick = useCallback(
    (day: Date) => {
      if (checkIn && checkOut) {
        // Both selected -> reset and set new check-in
        onClear();
        onSelectCheckIn(day);
        return;
      }

      if (!checkIn) {
        onSelectCheckIn(day);
        return;
      }

      // checkIn exists, no checkOut
      if (day.getTime() < checkIn.getTime()) {
        onClear();
        onSelectCheckIn(day);
        return;
      }

      if (isSameDay(day, checkIn)) return;

      if (rangeHasBlocked(checkIn, day)) {
        onClear();
        onSelectCheckIn(day);
        return;
      }

      if (daysBetween(checkIn, day) < minNights) return;

      onSelectCheckOut(day);
    },
    [checkIn, checkOut, onSelectCheckIn, onSelectCheckOut, onClear, minNights, rangeHasBlocked],
  );

  /* ── Render a single month grid ─────────────────────────── */
  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstWeekday = isoWeekday(new Date(year, month, 1));

    const cells: React.ReactNode[] = [];

    // Empty leading cells
    for (let i = 0; i < firstWeekday; i++) {
      cells.push(<div key={`empty-${i}`} aria-hidden="true" />);
    }

    for (let d = 1; d <= daysCount; d++) {
      const date = new Date(year, month, d);
      const dateStr = toDateString(date);

      /* ── Determine state ──────────────────────────── */
      const outsideSeason =
        date.getTime() < seasonOpen.getTime() ||
        date.getTime() > seasonClose.getTime();
      const inPast = date.getTime() < today.getTime();
      const blocked = blockedDates.has(dateStr);
      const isCheckIn = checkIn ? isSameDay(date, checkIn) : false;
      const isCheckOut = checkOut ? isSameDay(date, checkOut) : false;
      const inRange =
        checkIn && checkOut ? isDateInRange(date, checkIn, checkOut) && !isCheckIn && !isCheckOut : false;
      const isToday = isSameDay(date, today);

      const disabled = outsideSeason || inPast || blocked;

      let cellClasses =
        "relative flex h-10 w-10 items-center justify-center text-sm transition-colors rounded-xl";

      let title: string | undefined;

      if (outsideSeason) {
        cellClasses = cn(cellClasses, "text-stone-300 pointer-events-none cursor-default");
      } else if (inPast) {
        cellClasses = cn(cellClasses, "text-stone-300 pointer-events-none");
      } else if (blocked) {
        cellClasses = cn(cellClasses, "text-stone-300 line-through cursor-not-allowed");
        title = t("booking.date_blocked");
      } else if (isCheckIn) {
        cellClasses = cn(
          cellClasses,
          "bg-sage-600 text-white font-semibold",
          checkOut ? "rounded-r-none rounded-l-xl" : "rounded-xl",
        );
      } else if (isCheckOut) {
        cellClasses = cn(
          cellClasses,
          "bg-sage-600 text-white font-semibold rounded-l-none rounded-r-xl",
        );
      } else if (inRange) {
        cellClasses = cn(cellClasses, "bg-sage-100 text-sage-800 rounded-none");
      } else if (isToday) {
        cellClasses = cn(
          cellClasses,
          "ring-2 ring-sage-400 ring-inset text-stone-700 hover:bg-sage-50 cursor-pointer",
        );
      } else {
        cellClasses = cn(cellClasses, "text-stone-700 hover:bg-sage-50 cursor-pointer");
      }

      const ariaLabel = date.toLocaleDateString(
        locale === "ka" ? "ka-GE" : locale === "fr" ? "fr-FR" : "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" },
      );

      cells.push(
        <button
          key={d}
          type="button"
          disabled={disabled}
          title={title}
          aria-label={ariaLabel}
          className={cellClasses}
          onClick={() => !disabled && handleDayClick(date)}
        >
          {d}
        </button>,
      );
    }

    return (
      <div key={monthKey(monthDate)}>
        {/* Month header */}
        <h3 className="mb-3 text-center text-sm font-semibold text-stone-800">
          {monthNames[month]} {year}
        </h3>

        {/* Weekday headers */}
        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-stone-400">
          {weekdays.map((wd, i) => (
            <div key={i}>{wd}</div>
          ))}
        </div>

        {/* Day grid */}
        <div role="grid" aria-label={`${monthNames[month]} ${year}`} className="grid grid-cols-7 gap-1">
          {cells}
        </div>
      </div>
    );
  };

  /* ── Months to display ──────────────────────────────────── */
  const secondMonth = addMonths(currentMonth, 1);
  const showSecond = secondMonth.getTime() <= startOfMonth(seasonClose).getTime();

  return (
    <div>
      {/* Navigation row */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label={t("booking.calendar.prev_month")}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
            canGoPrev
              ? "text-stone-600 hover:bg-stone-100"
              : "text-stone-300 cursor-not-allowed",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label={t("booking.calendar.next_month")}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
            canGoNext
              ? "text-stone-600 hover:bg-stone-100"
              : "text-stone-300 cursor-not-allowed",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Calendar grids */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {renderMonth(currentMonth)}
        {showSecond && renderMonth(secondMonth)}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-sage-50 ring-1 ring-stone-200" />
          {t("booking.calendar.available")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-stone-200" />
          {t("booking.calendar.blocked")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-sage-600" />
          {t("booking.calendar.selected")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full ring-2 ring-sage-400" />
          {t("booking.calendar.today")}
        </span>
      </div>

      {/* Minimum nights notice */}
      <p className="mt-3 text-xs text-stone-400">
        {t("booking.min_nights", { min: minNights })}
      </p>
    </div>
  );
}

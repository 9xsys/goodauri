"use client";

import { useState, useCallback, useMemo } from "react";
import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";
import { cn, daysBetween, toDateString, formatDate } from "@/lib/utils";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

interface BookingFormProps {
  locale: Locale;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm({ locale }: BookingFormProps) {
  const t = createT(locale);

  /* ── State ──────────────────────────────────────────────── */
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const bothDatesSelected = checkIn !== null && checkOut !== null;
  const nights = bothDatesSelected ? daysBetween(checkIn, checkOut) : 0;
  const total = nights * siteConfig.pricePerNight;

  const formComplete = bothDatesSelected && name.trim() !== "" && email.trim() !== "";

  /* ── Calendar callbacks ─────────────────────────────────── */
  const handleSelectCheckIn = useCallback((d: Date) => {
    setCheckIn(d);
    setCheckOut(null);
  }, []);

  const handleSelectCheckOut = useCallback((d: Date) => {
    setCheckOut(d);
  }, []);

  const handleClear = useCallback(() => {
    setCheckIn(null);
    setCheckOut(null);
  }, []);

  /* ── Guest counter ──────────────────────────────────────── */
  const decGuests = useCallback(() => {
    setGuests((g) => Math.max(1, g - 1));
  }, []);

  const incGuests = useCallback(() => {
    setGuests((g) => Math.min(siteConfig.maxGuests, g + 1));
  }, []);

  /* ── Submit ─────────────────────────────────────────────── */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formComplete || !checkIn || !checkOut) return;

      setStatus("submitting");

      try {
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            checkIn: toDateString(checkIn),
            checkOut: toDateString(checkOut),
            guests,
            nights,
            locale,
          }),
        });

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [formComplete, checkIn, checkOut, name, email, message, guests, nights, locale],
  );

  /* ── Contact helpers ────────────────────────────────────── */
  const showWhatsApp =
    siteConfig.whatsapp && !siteConfig.whatsapp.includes("XXXX");
  const showTelegram =
    siteConfig.telegram && siteConfig.telegram !== "your_telegram";

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section id="availability" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <h2 className="text-center font-display text-4xl font-semibold text-stone-900">
          {t("booking.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-stone-500">
          {t("booking.subtitle")}
        </p>

        {/* Calendar */}
        <div className="mt-12">
          <AvailabilityCalendar
            locale={locale}
            checkIn={checkIn}
            checkOut={checkOut}
            onSelectCheckIn={handleSelectCheckIn}
            onSelectCheckOut={handleSelectCheckOut}
            onClear={handleClear}
          />
        </div>

        {/* Summary + Form area */}
        <div className="mx-auto mt-8 max-w-xl">
          {/* ── Summary panel ───────────────────────────── */}
          {bothDatesSelected && status !== "success" && (
            <div className="rounded-2xl bg-stone-50 p-6">
              {/* Date row */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                    {t("booking.check_in")}
                  </span>
                  <span className="mt-1 block font-semibold text-stone-800">
                    {formatDate(checkIn, locale)}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-stone-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-right">
                  <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                    {t("booking.check_out")}
                  </span>
                  <span className="mt-1 block font-semibold text-stone-800">
                    {formatDate(checkOut, locale)}
                  </span>
                </div>
              </div>

              {/* Nights row */}
              <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4 text-sm text-stone-600">
                <span>
                  {nights} {nights === 1 ? t("booking.night") : t("booking.nights")}
                </span>
                <span>
                  {nights} &times; ${siteConfig.pricePerNight}
                </span>
              </div>

              {/* Total */}
              <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-4">
                <span className="text-sm font-medium text-stone-500">
                  {t("booking.total")}
                </span>
                <span className="text-2xl font-bold text-stone-900">
                  ${total}
                </span>
              </div>
            </div>
          )}

          {/* ── Success state ───────────────────────────── */}
          {status === "success" && (
            <div className="rounded-2xl bg-sage-50 p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mx-auto h-12 w-12 text-sage-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="mt-4 text-2xl font-semibold text-stone-900">
                {t("booking.success_title")}
              </h3>
              <p className="mt-3 text-stone-600">
                {t("booking.success_message", {
                  hours: siteConfig.responseTimeHours,
                })}
              </p>
            </div>
          )}

          {/* ── Error state ─────────────────────────────── */}
          {status === "error" && (
            <div className="rounded-2xl bg-red-50 p-8 text-center">
              <h3 className="text-2xl font-semibold text-red-800">
                {t("booking.error_title")}
              </h3>
              <p className="mt-3 text-red-600">
                {t("booking.error_message")}
              </p>

              <div className="mt-6">
                <p className="mb-3 text-sm text-stone-500">
                  {t("booking.or_contact")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm ring-1 ring-stone-200 transition hover:bg-stone-50"
                  >
                    {/* Email icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                    </svg>
                    {t("booking.email_fallback")}
                  </a>
                  {showWhatsApp && (
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm ring-1 ring-stone-200 transition hover:bg-stone-50"
                    >
                      {/* WhatsApp icon */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-green-600">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {showTelegram && (
                    <a
                      href={`https://t.me/${siteConfig.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm ring-1 ring-stone-200 transition hover:bg-stone-50"
                    >
                      {/* Telegram icon */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-500">
                        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Booking form ────────────────────────────── */}
          {bothDatesSelected && status !== "success" && status !== "error" && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Guest counter */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-700">
                  {t("booking.guests")}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decGuests}
                    disabled={guests <= 1}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-lg font-medium transition",
                      guests <= 1
                        ? "cursor-not-allowed text-stone-300"
                        : "text-stone-600 hover:bg-stone-50",
                    )}
                    aria-label="Decrease guests"
                  >
                    &minus;
                  </button>
                  <span className="min-w-[2rem] text-center text-lg font-semibold text-stone-800">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={incGuests}
                    disabled={guests >= siteConfig.maxGuests}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 text-lg font-medium transition",
                      guests >= siteConfig.maxGuests
                        ? "cursor-not-allowed text-stone-300"
                        : "text-stone-600 hover:bg-stone-50",
                    )}
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Name */}
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("booking.name")}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-400"
              />

              {/* Email */}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("booking.email")}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-400"
              />

              {/* Message */}
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("booking.message")}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-sage-400 focus:ring-2 focus:ring-sage-400"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={!formComplete || status === "submitting"}
                className={cn(
                  "w-full rounded-2xl py-4 text-center font-semibold text-white transition",
                  formComplete && status !== "submitting"
                    ? "bg-sage-600 hover:bg-sage-700"
                    : "cursor-not-allowed bg-sage-300",
                )}
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    {/* Spinner */}
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("booking.submitting")}
                  </span>
                ) : (
                  t("booking.submit")
                )}
              </button>
            </form>
          )}

          {/* ── Direct contact — always visible (idle/submitting) ── */}
          {status !== "success" && (
            <div className="mt-8 text-center">
              <p className="mb-3 text-sm text-stone-400">
                {t("booking.or_contact")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-500 transition hover:bg-stone-50 hover:text-stone-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  {t("contact.email")}
                </a>

                {/* WhatsApp */}
                {showWhatsApp && (
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-500 transition hover:bg-stone-50 hover:text-stone-700"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-green-600">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t("contact.whatsapp")}
                  </a>
                )}

                {/* Telegram */}
                {showTelegram && (
                  <a
                    href={`https://t.me/${siteConfig.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-500 transition hover:bg-stone-50 hover:text-stone-700"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-500">
                      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.48-.428-.013-1.252-.242-1.865-.44-.751-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    {t("contact.telegram")}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

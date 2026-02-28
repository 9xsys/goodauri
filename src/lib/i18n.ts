import type { Locale } from "@/site-config";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import ka from "../../messages/ka.json";

const messages = { en, fr, ka } as const;

type Messages = typeof en;

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en;
}

// Deeply nested key access: t("booking.check_in") => "Check-in"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? path;
}

export function createT(locale: Locale) {
  const msgs = getMessages(locale);
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = getNestedValue(msgs, key);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };
}

// Get array from messages (e.g., faq.items)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getArray(locale: Locale, key: string): any[] {
  const msgs = getMessages(locale);
  const val = getNestedValue(msgs, key);
  return Array.isArray(val) ? val : [];
}

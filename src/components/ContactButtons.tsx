"use client";

import { createT } from "@/lib/i18n";
import type { Locale } from "@/site-config";
import { siteConfig } from "@/site-config";

export default function ContactButtons({ locale }: { locale: Locale }) {
  const t = createT(locale);

  const whatsappValid =
    siteConfig.whatsapp &&
    siteConfig.whatsapp.trim() !== "" &&
    !siteConfig.whatsapp.includes("XXXX");

  const telegramValid =
    siteConfig.telegram &&
    siteConfig.telegram.trim() !== "" &&
    !siteConfig.telegram.includes("your_telegram");

  if (!whatsappValid && !telegramValid) {
    return null;
  }

  const whatsappLink = `https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`;
  const telegramLink = `https://t.me/${siteConfig.telegram}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {whatsappValid && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("contact.whatsapp")}
          className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg p-3.5 transition"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      )}

      {telegramValid && (
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("contact.telegram")}
          className="rounded-full bg-[#0088cc] hover:bg-[#006da3] shadow-lg p-3.5 transition"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.056 0h-.112ZM17.67 7.066c.183-.01.37.027.527.112l-.003.005s.005-.002.005-.002c.158.09.27.235.312.404.054.21.108.655-.05 1.708-.207 1.38-.812 4.73-1.148 6.276-.142.654-.422.873-.693.895-.588.048-1.035-.389-1.604-.762-.89-.584-1.394-.947-2.258-1.516-.999-.657-.351-1.019.218-1.61.15-.155 2.737-2.509 2.786-2.722.006-.027.012-.125-.047-.177-.058-.052-.144-.034-.206-.02-.088.02-1.49.947-4.208 2.78-.398.274-.759.407-1.082.4-.356-.009-1.04-.201-1.549-.367-.624-.203-1.12-.31-1.077-.655.022-.18.267-.365.735-.553 2.88-1.254 4.8-2.082 5.762-2.484 2.744-1.142 3.314-1.34 3.686-1.346l.088-.002Z" />
          </svg>
        </a>
      )}
    </div>
  );
}

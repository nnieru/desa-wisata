"use client";

import { useLocale, useTranslations } from "next-intl";

import { FallbackImage, Separator } from "@/components/ui";
import { formatCurrency, formatDateRange } from "@/lib/format";
import type { Destination } from "@/types/destination";
import { useBookingStore } from "@/stores/use-booking-store";

export function BookingSummary({ destination }: { destination: Destination }) {
  const t = useTranslations("booking.summary");
  const locale = useLocale();
  const { form } = useBookingStore();
  const nights = 6;
  const stayTotal = destination.pricePerNight * nights;
  const serviceFee = 45000;
  const levy = 12000;
  const total = stayTotal + serviceFee + levy;

  return (
    <aside className="rounded-4xl bg-surface-container-lowest p-5 shadow-ambient">
      <div className="overflow-hidden rounded-[1.5rem]">
        <div className="relative h-52 w-full">
          <FallbackImage
            src={destination.heroImage}
            alt={destination.name}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
            {t("stayType")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-on-surface">
            {destination.name}
          </h3>
        </div>
        <p className="text-right text-2xl font-semibold text-primary">
          {formatCurrency(total, locale)}
        </p>
      </div>

      <div className="mt-6 grid gap-4 rounded-[1.5rem] bg-surface-container-low p-4 text-sm">
        <SummaryRow
          label={t("dates")}
          value={formatDateRange(form.checkIn, form.checkOut, locale)}
        />
        <SummaryRow label={t("guests")} value={form.guests} />
        <SummaryRow
          label={t("duration")}
          value={t("nights", { count: nights })}
        />
      </div>

      <div className="mt-6 space-y-3 text-sm text-on-surface-variant">
        <SummaryRow
          label={t("rateLine", {
            rate: formatCurrency(destination.pricePerNight, locale),
            nights,
          })}
          value={formatCurrency(stayTotal, locale)}
        />
        <SummaryRow
          label={t("serviceFee")}
          value={formatCurrency(serviceFee, locale)}
        />
        <SummaryRow label={t("ecoLevy")} value={formatCurrency(levy, locale)} />
      </div>

      <Separator className="my-5 bg-surface-container-high" />

      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-on-surface">{t("total")}</p>
        <p className="text-2xl font-semibold text-on-surface">
          {formatCurrency(total, locale)}
        </p>
      </div>
      <p className="mt-5 rounded-[1.25rem] bg-secondary-container/45 p-4 text-sm text-on-secondary-container">
        {t("contribution")}
      </p>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-on-surface">{value}</span>
    </div>
  );
}

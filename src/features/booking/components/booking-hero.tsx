"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { fadeInUp } from "@/utils/motion";

export function BookingHero({
  destinationSlug,
  destinationName,
}: {
  destinationSlug: string;
  destinationName: string;
}) {
  const t = useTranslations("booking.hero");

  return (
    <motion.div {...fadeInUp} className="mb-10">
      <nav
        aria-label="Booking flow"
        className="flex items-center gap-2 text-xs text-on-surface-variant"
      >
        <Link href="/explore" className="hover:text-primary transition-colors">
          {t("stepExplore")}
        </Link>
        <span aria-hidden>›</span>
        <Link
          href={`/destinations/${destinationSlug}`}
          className="hover:text-primary transition-colors"
        >
          {destinationName}
        </Link>
        <span aria-hidden>›</span>
        <span className="font-semibold text-primary">{t("stepBook")}</span>
      </nav>

      <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
        {t("description")}
      </p>
    </motion.div>
  );
}

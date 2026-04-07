"use client";

import { Leaf, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { fadeInUp, staggerChildren } from "@/utils/motion";

const points = [
  { icon: <Sparkles className="h-5 w-5" />, key: "localConnections" },
  { icon: <Leaf className="h-5 w-5" />, key: "sustainableTourism" },
  { icon: <MapPinned className="h-5 w-5" />, key: "expertGuides" },
  { icon: <ShieldCheck className="h-5 w-5" />, key: "seamlessBooking" },
];

export function WhyChooseUs() {
  const t = useTranslations("home.whyChooseUs");

  return (
    <section className="py-20 sm:py-24">
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
      </motion.div>

      <motion.div
        {...staggerChildren}
        className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4"
      >
        {points.map((point) => (
          <motion.div key={point.key} {...fadeInUp} className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-primary">
              {point.icon}
            </div>
            <h3 className="mt-5 text-base font-semibold text-on-surface">
              {t(`points.${point.key}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              {t(`points.${point.key}.description`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

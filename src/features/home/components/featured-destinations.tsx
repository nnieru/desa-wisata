"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Button, FallbackImage } from "@/components/ui";
import {
  destinations,
  featuredDestinationIds,
} from "@/lib/mock-data/destinations";
import { fadeInUp, staggerChildren } from "@/utils/motion";
import { formatCurrency } from "@/utils/format";
import type { Destination } from "@/types/destination";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const featuredDestinations = featuredDestinationIds
  .map((id) => destinations.find((destination) => destination.id === id))
  .filter((destination): destination is Destination => Boolean(destination));

export function FeaturedDestinations() {
  const t = useTranslations("home.featuredDestinations");
  const locale = useLocale();

  return (
    <section className="py-20 sm:py-24">
      <motion.div
        {...fadeInUp}
        className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant">
            {t("description")}
          </p>
        </div>
        <Button
          asChild
          variant="ghost"
          className="w-fit px-0 text-primary hover:bg-transparent hover:text-primary-dim"
        >
          <Link href="/explore">
            {t("viewAll")}
            <span className="inline-flex">
              <Star className="h-4 w-4" />
            </span>
          </Link>
        </Button>
      </motion.div>

      <motion.div {...staggerChildren} className="grid gap-8 md:grid-cols-3">
        {featuredDestinations.map((destination) => (
          <motion.article key={destination.id} {...fadeInUp} className="group">
            <Link href={`/destinations/${destination.slug}`} className="block">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-card transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-ambient">
                <FallbackImage
                  alt={destination.name}
                  src={destination.heroImage}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-on-surface shadow-sm backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-tertiary-fixed text-tertiary-fixed" />
                  {destination.rating.toFixed(1)}
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-xl font-semibold text-on-surface transition-colors group-hover:text-primary">
                  {destination.name}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {destination.region}
                </p>
                <p className="pt-1 text-sm text-primary">
                  {t("from")}{" "}
                  {formatCurrency(destination.pricePerNight, locale)}{" "}
                  <span className="text-xs text-on-surface-variant">
                    {t("perNight")}
                  </span>
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

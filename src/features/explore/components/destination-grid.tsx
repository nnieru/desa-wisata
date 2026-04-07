"use client";

import { MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Badge, Card, FallbackImage } from "@/components/ui";
import { cn } from "@/lib/cn";
import { destinations } from "@/lib/mock-data/destinations";
import { fadeInUp, staggerChildren } from "@/utils/motion";
import { formatCurrency } from "@/utils/format";
import { useSearchStore } from "@/features/explore/stores/use-search-store";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function DestinationGrid() {
  const t = useTranslations("explore.grid");
  const locale = useLocale();
  const { query, experience, rating } = useSearchStore();

  const filteredDestinations = destinations.filter((destination) => {
    const matchesQuery =
      !query ||
      destination.name.toLowerCase().includes(query.toLowerCase()) ||
      destination.region.toLowerCase().includes(query.toLowerCase());
    const matchesExperience =
      experience.length === 0 ||
      destination.tags.some((tag) => experience.includes(tag));
    const matchesRating = destination.rating >= rating;
    return matchesQuery && matchesExperience && matchesRating;
  });

  return (
    <motion.div
      {...staggerChildren}
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {filteredDestinations.map((destination, index) => (
        <motion.article key={destination.id} {...fadeInUp} className="group">
          <Link href={`/destinations/${destination.slug}`} className="block">
            <Card className="overflow-hidden p-0 transition-transform duration-500 group-hover:-translate-y-1">
              <div className="relative aspect-4/5 overflow-hidden">
                <FallbackImage
                  src={destination.heroImage}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <Badge
                  className={cn(
                    "absolute right-4 top-4 bg-white/85 text-on-surface backdrop-blur-md",
                    index % 3 === 0 ? "uppercase tracking-[0.2em]" : "",
                  )}
                >
                  {destination.tags[0]}
                </Badge>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-on-surface transition-colors group-hover:text-primary">
                      {destination.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.region}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-on-surface">
                    <Star className="h-4 w-4 fill-tertiary-fixed text-tertiary-fixed" />
                    {destination.rating.toFixed(1)}
                  </div>
                </div>
                <p className="text-sm leading-6 text-on-surface-variant">
                  {destination.tagline}
                </p>
                <p className="pt-1 text-sm text-primary">
                  {t("from")}{" "}
                  {formatCurrency(destination.pricePerNight, locale)}{" "}
                  <span className="text-xs text-on-surface-variant">
                    {t("perNight")}
                  </span>
                </p>
              </div>
            </Card>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}

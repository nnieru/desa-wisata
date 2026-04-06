import { MapPin, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { Badge, Button, FallbackImage } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/lib/format";
import type { Destination } from "@/types/destination";

export function DestinationHero({ destination }: { destination: Destination }) {
  const t = useTranslations("destination.hero");
  const locale = useLocale();

  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
      <div className="overflow-hidden rounded-4xl bg-surface-container-low shadow-ambient">
        <div className="relative aspect-4/3 w-full">
          <FallbackImage
            src={destination.heroImage}
            alt={destination.name}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div className="absolute left-6 top-6 flex gap-2">
            {destination.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-white/85 text-on-surface backdrop-blur-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-4xl bg-surface-container-lowest p-6 shadow-card">
        <div>
          <Badge variant="neutral" className="w-fit">
            {t("badge")}
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            {destination.name}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-on-surface-variant">
            <MapPin className="h-4 w-4" />
            <span>{destination.region}</span>
            <span>•</span>
            <Star className="h-4 w-4 fill-tertiary-fixed text-tertiary-fixed" />
            <span>
              {t("rating", {
                rating: destination.rating.toFixed(1),
                count: destination.reviewCount,
              })}
            </span>
          </div>
          <p className="mt-5 text-base leading-8 text-on-surface-variant">
            {destination.description}
          </p>
        </div>
        <div className="mt-8 flex items-end justify-between gap-4 rounded-[1.5rem] bg-surface-container-low p-5">
          <div>
            <p className="text-sm text-on-surface-variant">From</p>
            <p className="font-display text-3xl font-semibold text-primary">
              {formatCurrency(destination.pricePerNight, locale)}
            </p>
            <p className="text-sm text-on-surface-variant">{t("perNight")}</p>
          </div>
          <Button size="lg" asChild>
            <Link href={`/booking?slug=${destination.slug}`}>
              {t("bookNow")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

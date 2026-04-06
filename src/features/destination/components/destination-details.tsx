import { Badge } from "@/components/ui";
import { useTranslations } from "next-intl";
import type { Destination } from "@/types/destination";

export function DestinationDetails({
  destination,
}: {
  destination: Destination;
}) {
  const t = useTranslations("destination.details");

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-on-surface">
          {t("title")}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {destination.amenities.map((amenity) => (
            <Badge
              key={amenity}
              variant="neutral"
              className="px-4 py-2 text-sm"
            >
              {amenity}
            </Badge>
          ))}
        </div>
        <div className="mt-10 space-y-4 text-base leading-8 text-on-surface-variant">
          {destination.highlights.map((highlight) => (
            <p key={highlight}>{highlight}</p>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] bg-surface-container-low p-6 shadow-[0_4px_20px_rgba(45,51,53,0.04)]">
        <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-on-surface-variant">
          {t("arrivalSnapshot")}
        </h3>
        <div className="mt-5 grid gap-4">
          <div className="rounded-[1.5rem] bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">
              {t("atmosphereLabel")}
            </p>
            <p className="mt-1 text-lg font-semibold text-on-surface">
              {t("atmosphereValue")}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">
              {t("bestForLabel")}
            </p>
            <p className="mt-1 text-lg font-semibold text-on-surface">
              {t("bestForValue")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

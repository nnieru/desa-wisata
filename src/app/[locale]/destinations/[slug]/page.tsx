import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { PageShell } from "@/components/layout/page-shell";
import { Badge, Button, Separator } from "@/components/ui";
import { DestinationDetails } from "@/features/destination/components/destination-details";
import { DestinationGallery } from "@/features/destination/components/destination-gallery";
import { DestinationHero } from "@/features/destination/components/destination-hero";
import { ReviewsSection } from "@/features/destination/components/reviews-section";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/lib/mock-data/destinations";
import { formatCurrency } from "@/utils/format";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const t = await getTranslations("destinationPage");
  const locale = await getLocale();
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <PageShell>
      <section className="space-y-10 py-10 sm:py-14">
        <DestinationHero destination={destination} />
        <DestinationGallery destination={destination} />
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <DestinationDetails destination={destination} />
            <ReviewsSection />
          </div>
          <aside className="sticky top-28 h-fit rounded-4xl bg-surface-container-lowest p-6 shadow-ambient">
            <Badge className="mb-4">{t("bestValue")}</Badge>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-on-surface-variant">{t("from")}</p>
                <p className="font-display text-3xl font-semibold text-primary">
                  {formatCurrency(destination.pricePerNight, locale)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-on-surface">
                <Star className="h-4 w-4 fill-tertiary-fixed text-tertiary-fixed" />
                {destination.rating.toFixed(1)}
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-surface-container-low p-4 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{destination.region}</span>
              </div>
              <Separator className="my-4 bg-surface-container-high" />
              <p>{t("bookingCardDescription")}</p>
            </div>
            <Button size="lg" className="mt-6 w-full" asChild>
              <Link href={`/booking?slug=${destination.slug}`}>
                {t("bookNow")}
              </Link>
            </Button>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

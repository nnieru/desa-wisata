import { redirect } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { BookingForm } from "@/features/booking/components/booking-form";
import { BookingHero } from "@/features/booking/components/booking-hero";
import { BookingSummary } from "@/features/booking/components/booking-summary";
import { destinations } from "@/lib/mock-data/destinations";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    redirect("/explore");
  }

  return (
    <PageShell>
      <section className="py-10 sm:py-14">
        <BookingHero
          destinationSlug={destination.slug}
          destinationName={destination.name}
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <BookingForm />
          <BookingSummary destination={destination} />
        </div>
      </section>
    </PageShell>
  );
}

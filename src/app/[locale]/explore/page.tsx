import { PageShell } from "@/components/layout/page-shell";
import { DestinationGrid } from "@/features/explore/components/destination-grid";
import { ExploreHeader } from "@/features/explore/components/explore-header";
import { FilterSidebar } from "@/features/explore/components/filter-sidebar";

export default function ExplorePage() {
  return (
    <PageShell>
      <section className="py-10 sm:py-14">
        <ExploreHeader />
        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
          <FilterSidebar />
          <DestinationGrid />
        </div>
      </section>
    </PageShell>
  );
}

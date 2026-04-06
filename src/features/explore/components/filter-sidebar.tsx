"use client";

import { useMemo } from "react";
import { Check, Search, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge, Button, Input } from "@/components/ui";
import { useSearchStore } from "@/stores/use-search-store";

const experienceOptions = [
  "adventure",
  "culinary",
  "wellness",
  "heritage",
  "nature",
] as const;
const priceRanges = ["under50", "50to150", "150to300", "300plus"] as const;

export function FilterSidebar() {
  const t = useTranslations("explore.filters");
  const {
    query,
    setQuery,
    priceRange,
    setPriceRange,
    experience,
    toggleExperience,
    rating,
    setRating,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
  } = useSearchStore();

  const activeExperienceCount = useMemo(() => experience.length, [experience]);

  return (
    <aside className="lg:w-72">
      <div className="sticky top-28 space-y-8 rounded-[1.75rem] bg-surface-container-low p-5 shadow-[0_4px_20px_rgba(45,51,53,0.04)]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-11"
          />
        </div>

        <FilterGroup title={t("dateRange")}>
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
                {t("checkIn")}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="h-10 w-full rounded-xl border border-outline-variant bg-surface px-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
                {t("checkOut")}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
                className="h-10 w-full rounded-xl border border-outline-variant bg-surface px-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </FilterGroup>

        <FilterGroup title={t("priceRange")}>
          {priceRanges.map((range) => {
            const label = t(`priceOptions.${range}`);
            const active = priceRange === label;
            return (
              <button
                key={range}
                onClick={() => setPriceRange(label)}
                className="flex items-center gap-3 text-left text-sm"
              >
                <span
                  className={
                    active
                      ? "grid h-5 w-5 place-items-center rounded-md bg-primary text-on-primary"
                      : "grid h-5 w-5 place-items-center rounded-md border border-outline-variant text-transparent"
                  }
                >
                  {active ? <Check className="h-3.5 w-3.5" /> : "•"}
                </span>
                <span
                  className={
                    active
                      ? "font-semibold text-on-surface"
                      : "text-on-surface-variant"
                  }
                >
                  {label}
                </span>
              </button>
            );
          })}
        </FilterGroup>

        <FilterGroup title={t("experience")}>
          <div className="flex flex-wrap gap-2">
            {experienceOptions.map((item) => {
              const label = t(`experienceOptions.${item}`);
              const active = experience.includes(label);
              return (
                <Badge
                  key={item}
                  variant={active ? "default" : "neutral"}
                  className="cursor-pointer px-3 py-2 text-xs"
                  onClick={() => toggleExperience(label)}
                >
                  {label}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-on-surface-variant">
            {t("activeFilters", { count: activeExperienceCount })}
          </p>
        </FilterGroup>

        <FilterGroup title={t("minimumRating")}>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className="text-tertiary-fixed transition-transform hover:scale-110"
              >
                <Star
                  className={
                    value <= rating ? "h-4 w-4 fill-current" : "h-4 w-4"
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-semibold text-on-surface-variant">
              {rating}.0+
            </span>
          </div>
        </FilterGroup>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => useSearchStore.getState().reset()}
        >
          {t("resetFilters")}
        </Button>
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

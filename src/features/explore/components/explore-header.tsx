import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";

export function ExploreHeader() {
  const t = useTranslations("explore.header");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-on-surface">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-on-surface-variant">
          {t("description")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
          {t("sortBy")}
        </span>
        <Button variant="outline" size="sm" className="gap-2 px-4">
          {t("recommended")}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

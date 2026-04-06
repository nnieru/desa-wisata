"use client";

import type { Route } from "next";
import { useLocale, useTranslations } from "next-intl";

import { mainNavigation } from "@/lib/mock-data/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { Link, usePathname } from "@/i18n/navigation";

export function SiteHeader() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-surface/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="brand text-xl font-semibold tracking-tight text-on-surface"
        >
          {t("brand")}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.labelKey}
                href={item.href as Route}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                <span
                  className={cn("pb-1", active && "border-b-2 border-primary")}
                >
                  {t(`nav.${item.labelKey}`)}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full bg-surface-container-low px-1 py-1 md:flex">
            <Link
              href={pathname}
              locale="en"
              className={cn(
                "rounded-full px-2 py-1 text-xs font-semibold",
                locale === "en"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant",
              )}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="id"
              className={cn(
                "rounded-full px-2 py-1 text-xs font-semibold",
                locale === "id"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant",
              )}
            >
              ID
            </Link>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/login">{t("signIn")}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/explore">{t("bookNow")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

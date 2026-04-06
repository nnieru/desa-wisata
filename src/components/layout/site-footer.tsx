import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-24 bg-primary text-on-primary">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="brand text-2xl font-semibold">{t("brand")}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-on-primary/75">
            {t("description")}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-primary/90">
            {t("explore.title")}
          </p>
          <div className="mt-4 grid gap-3 text-sm text-on-primary/75">
            <Link href="/explore">{t("explore.destinations")}</Link>
            <Link href="/booking">{t("explore.bookings")}</Link>
            <Link href="/destinations/ubud-sanctuary">
              {t("explore.highlights")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-primary/90">
            {t("support.title")}
          </p>
          <div className="mt-4 grid gap-3 text-sm text-on-primary/75">
            <Link href="#">{t("support.travelGuides")}</Link>
            <Link href="#">{t("support.privacyPolicy")}</Link>
            <Link href="#">{t("support.contactUs")}</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-primary/90">
            {t("newsletter.title")}
          </p>
          <div className="mt-4 flex rounded-full bg-white/10 p-1">
            <input
              className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-3 text-sm text-on-primary placeholder:text-on-primary/55 focus:outline-none"
              placeholder={t("newsletter.placeholder")}
            />
            <button className="rounded-full bg-on-primary px-4 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]">
              {t("newsletter.join")}
            </button>
          </div>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 text-xs text-on-primary/65 lg:px-8">
        <p>
          © {new Date().getFullYear()} {t("brand")}. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}

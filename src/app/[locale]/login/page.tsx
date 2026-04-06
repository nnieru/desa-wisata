import { PageShell } from "@/components/layout/page-shell";
import { Button, Input, Label } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("auth.login");

  return (
    <PageShell>
      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-4xl bg-surface-container-low p-5 shadow-card md:grid-cols-[1.05fr_1fr] md:p-7">
          <div className="rounded-3xl bg-primary px-6 py-8 text-on-primary sm:px-8 sm:py-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-on-primary/80">
              {t("badge")}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-on-primary/85">
              {t("description")}
            </p>
          </div>

          <form className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">{t("email")}</Label>
                <Input type="email" placeholder={t("emailPlaceholder")} />
              </div>
              <div>
                <Label className="mb-2 block">{t("password")}</Label>
                <Input type="password" placeholder={t("passwordPlaceholder")} />
              </div>
            </div>

            <Button className="mt-6 w-full">{t("submit")}</Button>

            <p className="mt-5 text-center text-sm text-on-surface-variant">
              {t("noAccount")}{" "}
              <Link href="/register" className="font-semibold text-primary">
                {t("register")}
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

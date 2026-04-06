"use client";

import {
  ArrowRight,
  Compass,
  Leaf,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { PageShell } from "@/components/layout/page-shell";
import { destinations } from "@/lib/mock-data/destinations";
import { experiences } from "@/lib/mock-data/experiences";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { Link } from "@/i18n/navigation";

const values = [
  { icon: <Sparkles className="h-5 w-5" />, key: "localFirst" },
  { icon: <ShieldCheck className="h-5 w-5" />, key: "transparent" },
  { icon: <Compass className="h-5 w-5" />, key: "slowTravel" },
  { icon: <Leaf className="h-5 w-5" />, key: "sustainable" },
] as const;

const steps = [
  { icon: <MapPinned className="h-5 w-5" />, key: "browse" },
  { icon: <Sparkles className="h-5 w-5" />, key: "learn" },
  { icon: <ShieldCheck className="h-5 w-5" />, key: "reserve" },
] as const;

export function AboutPage() {
  const t = useTranslations("about");

  const stats = [
    { value: destinations.length, label: t("stats.destinations") },
    { value: experiences.length, label: t("stats.experiences") },
    { value: 2, label: t("stats.languages") },
    { value: 1, label: t("stats.booking") },
  ];

  return (
    <PageShell>
      <div className="space-y-20 py-10 sm:py-14">
        <section className="relative overflow-hidden rounded-4xl border border-outline/10 bg-surface-container-lowest px-6 py-14 shadow-card sm:px-10 lg:px-14 lg:py-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(45,106,79,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(197,231,213,0.35),transparent_30%)]" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <span className="inline-flex rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-primary">
                {t("hero.badge")}
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-on-surface-variant sm:text-lg">
                  {t("hero.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/explore">{t("hero.primaryCta")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/booking">{t("hero.secondaryCta")}</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              {...staggerChildren}
              className="grid gap-4 sm:grid-cols-2"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} {...fadeInUp}>
                  <Card className="h-full border border-outline/10 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-4xl font-semibold text-primary">
                        {stat.value.toString().padStart(2, "0")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-on-surface-variant">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div {...fadeInUp} className="space-y-5">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("story.title")}
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl">
              {t("story.title")}
            </h2>
            <p className="max-w-xl text-base leading-8 text-on-surface-variant">
              {t("story.description")}
            </p>
          </motion.div>

          <motion.div
            {...staggerChildren}
            className="grid gap-4 sm:grid-cols-3"
          >
            {(["discover", "book", "support"] as const).map((key) => (
              <motion.div key={key} {...fadeInUp}>
                <Card className="h-full border border-outline/10">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-on-surface">
                      {t(`story.points.${key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-on-surface-variant">
                      {t(`story.points.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="space-y-8">
          <motion.div {...fadeInUp} className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("values.title")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl">
              {t("values.title")}
            </h2>
          </motion.div>

          <motion.div
            {...staggerChildren}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div key={value.key} {...fadeInUp}>
                <Card className="h-full border border-outline/10">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-container text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="pt-3 text-lg">
                      {t(`values.items.${value.key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-on-surface-variant">
                      {t(`values.items.${value.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="grid gap-8 rounded-4xl bg-surface-container-low px-6 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <motion.div {...fadeInUp} className="space-y-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("process.title")}
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-on-surface sm:text-4xl">
              {t("process.title")}
            </h2>
            <p className="max-w-xl text-base leading-8 text-on-surface-variant">
              {t("cta.description")}
            </p>
          </motion.div>

          <motion.div {...staggerChildren} className="grid gap-4">
            {steps.map((step, index) => (
              <motion.div key={step.key} {...fadeInUp}>
                <Card className="border border-outline/10 bg-surface-container-lowest">
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-primary">
                      {step.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        0{index + 1}
                      </p>
                      <CardTitle className="text-lg">
                        {t(`process.steps.${step.key}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-on-surface-variant">
                      {t(`process.steps.${step.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="rounded-4xl bg-primary px-6 py-12 text-on-primary sm:px-10 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-on-primary/80 sm:text-base">
                {t("cta.description")}
              </p>
            </div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="justify-self-start lg:justify-self-end"
            >
              <Link href="/explore">
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

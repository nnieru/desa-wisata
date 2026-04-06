"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Badge, Button, Card, FallbackImage } from "@/components/ui";
import { experiences } from "@/lib/mock-data/experiences";
import { fadeInUp, staggerChildren } from "@/lib/motion";
import { formatCurrency } from "@/lib/format";
import { useLocale } from "next-intl";

export function PopularExperiences() {
  const t = useTranslations("home.popularExperiences");
  const locale = useLocale();

  return (
    <section className="rounded-4xl bg-surface-container-low py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          {...staggerChildren}
          className="grid gap-5 overflow-hidden lg:grid-cols-4"
        >
          {experiences.map((experience) => (
            <motion.article key={experience.id} {...fadeInUp}>
              <Card className="h-full p-4">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                  <FallbackImage
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Badge className="mt-4 w-fit bg-primary-container/60 text-primary-dim">
                  {experience.category}
                </Badge>
                <h3 className="mt-3 text-lg font-semibold text-on-surface">
                  {experience.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  {experience.description}
                </p>
                <div className="mt-5 flex items-center justify-between pt-4">
                  <span className="font-semibold text-on-surface">
                    {formatCurrency(experience.price, locale)}
                    {t("perPerson")}
                  </span>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

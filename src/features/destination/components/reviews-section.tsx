import { useTranslations } from "next-intl";

const reviews = [
  {
    name: "Sarah Jenkins",
    date: "October 2025",
    textKey: "sarah",
  },
  {
    name: "Marcus Thorne",
    date: "December 2025",
    textKey: "marcus",
  },
];

export function ReviewsSection() {
  const t = useTranslations("destination.reviews");

  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-on-surface">
          {t("title")}
        </h2>
        <a className="text-sm font-semibold text-primary" href="#">
          {t("showAll")}
        </a>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(45,51,53,0.04)]"
          >
            <p className="text-sm font-semibold text-on-surface">
              {review.name}
            </p>
            <p className="mt-1 text-xs text-on-surface-variant">
              {review.date}
            </p>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              {t(`items.${review.textKey}`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

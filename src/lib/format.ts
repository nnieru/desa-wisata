export function formatCurrency(value: number, locale = "en") {
  const resolvedLocale = locale.startsWith("id") ? "id-ID" : "en-US";

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateRange(
  checkIn: string,
  checkOut: string,
  locale = "en-US",
) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

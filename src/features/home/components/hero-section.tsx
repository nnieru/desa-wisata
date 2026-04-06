"use client";

import { forwardRef, useState } from "react";
import { CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="pt-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-4xl bg-surface-container-low shadow-ambient"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10, 12, 10, 0.18), rgba(10, 12, 10, 0.58)), url(/images/dummy-placeholder.svg)",
          }}
        />
        <div className="relative mx-auto flex min-h-136 max-w-4xl flex-col items-center justify-center px-6 py-16 text-center text-white sm:px-10">
          <p className="mb-4 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-md">
            {t("badge")}
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">
            {t("description")}
          </p>

          <div className="mt-10 grid w-full gap-3 rounded-4xl bg-surface-container-lowest/95 p-3 text-left shadow-soft backdrop-blur-xl lg:grid-cols-[1fr_1fr_1fr_auto]">
            <DestinationField />
            <DateField />
            <GuestField />
            <Button asChild size="lg" className="h-full px-7">
              <Link href="/explore">{t("search")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Shared field shell ─────────────────────────────────── */

const FieldShell = forwardRef<
  HTMLButtonElement,
  {
    icon: React.ReactNode;
    label: string;
    value?: string;
    placeholder: string;
    className?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function FieldShell(
  { icon, label, value, placeholder, className, ...props },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      className={cn(
        "flex w-full items-center gap-3 rounded-[1.25rem] bg-surface-container-lowest px-4 py-4 text-left",
        "ring-1 ring-inset ring-outline/10 transition-all hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        className,
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
          {label}
        </span>
        <span
          className={cn(
            "block truncate text-sm font-medium",
            value ? "text-on-surface" : "text-on-surface-variant/70",
          )}
        >
          {value ?? placeholder}
        </span>
      </span>
    </button>
  );
});

/* ─── Destination field (plain text search) ─────────────── */

function DestinationField() {
  const t = useTranslations("home.hero.destination");

  return (
    <label className="flex items-center gap-3 rounded-[1.25rem] bg-surface-container-lowest px-4 py-4 ring-1 ring-inset ring-outline/10 transition-all focus-within:ring-primary/60">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-primary">
        <Search className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
          {t("label")}
        </span>
        <Input
          className="h-auto border-0 bg-transparent p-0 text-sm font-medium text-on-surface placeholder:text-on-surface-variant/70 focus-visible:ring-0"
          placeholder={t("placeholder")}
        />
      </span>
    </label>
  );
}

/* ─── Date range picker field ────────────────────────────── */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function fmtDate(d: string) {
  const [, m, day] = d.split("-");
  return `${MONTHS[parseInt(m) - 1]} ${parseInt(day)}`;
}

function DateField() {
  const t = useTranslations("home.hero.date");
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const displayValue =
    checkIn && checkOut
      ? `${fmtDate(checkIn)} – ${fmtDate(checkOut)}`
      : checkIn
        ? fmtDate(checkIn)
        : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FieldShell
          icon={<CalendarDays className="h-4 w-4" />}
          label={t("label")}
          value={displayValue}
          placeholder={t("placeholder")}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-5">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
              {t("checkIn")}
            </p>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value > checkOut) setCheckOut("");
              }}
              className="w-full rounded-xl bg-surface-container px-3 py-2.5 text-sm font-medium text-on-surface ring-1 ring-inset ring-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
              {t("checkOut")}
            </p>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl bg-surface-container px-3 py-2.5 text-sm font-medium text-on-surface ring-1 ring-inset ring-outline/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Guest selector field ───────────────────────────────── */

type GuestCounts = { adults: number; children: number; infants: number };

function GuestField() {
  const t = useTranslations("home.hero.guests");
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const parts = [
    guests.adults > 0 ? t("adultCount", { count: guests.adults }) : "",
    guests.children > 0 ? t("childrenCount", { count: guests.children }) : "",
    guests.infants > 0 ? t("infantCount", { count: guests.infants }) : "",
  ].filter(Boolean);

  const displayValue =
    guests.adults === 1 && guests.children === 0 && guests.infants === 0
      ? undefined
      : parts.join(", ");

  function adjust(key: keyof GuestCounts, delta: number) {
    setGuests((prev) => {
      const min = key === "adults" ? 1 : 0;
      return { ...prev, [key]: Math.max(min, Math.min(prev[key] + delta, 12)) };
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FieldShell
          icon={<Users className="h-4 w-4" />}
          label={t("label")}
          value={displayValue}
          placeholder={t("placeholder")}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-5">
        <GuestRow
          label={t("adults")}
          sub={t("ageAdults")}
          value={guests.adults}
          onAdjust={(d) => adjust("adults", d)}
          min={1}
        />
        <GuestRow
          label={t("children")}
          sub={t("ageChildren")}
          value={guests.children}
          onAdjust={(d) => adjust("children", d)}
        />
        <GuestRow
          label={t("infants")}
          sub={t("ageInfants")}
          value={guests.infants}
          onAdjust={(d) => adjust("infants", d)}
        />
      </PopoverContent>
    </Popover>
  );
}

function GuestRow({
  label,
  sub,
  value,
  onAdjust,
  min = 0,
}: {
  label: string;
  sub: string;
  value: number;
  onAdjust: (delta: number) => void;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 not-last:border-b not-last:border-outline/10">
      <div>
        <p className="text-sm font-semibold text-on-surface">{label}</p>
        <p className="text-xs text-on-surface-variant">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onAdjust(-1)}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-inset ring-outline/25 transition-colors hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-on-surface">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onAdjust(1)}
          disabled={value >= 12}
          className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-inset ring-outline/25 transition-colors hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

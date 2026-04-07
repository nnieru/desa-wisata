"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge, Button, Input, Label } from "@/components/ui";
import { useBookingStore } from "@/features/booking/stores/use-booking-store";

type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  requests: string;
  checkIn: string;
  checkOut: string;
  paymentMethod: "card" | "wallet";
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

const createBookingFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      fullName: z.string().min(2, t("errors.fullName")),
      email: z.string().email(t("errors.email")),
      phone: z.string().min(8, t("errors.phone")).max(20, t("errors.phone")),
      requests: z
        .string()
        .min(10, t("errors.requestsMin"))
        .max(200, t("errors.requestsMax")),
      checkIn: z.string().min(1, t("errors.checkIn")),
      checkOut: z.string().min(1, t("errors.checkOut")),
      paymentMethod: z.enum(["card", "wallet"]),
      cardNumber: z
        .string()
        .regex(/^\d{4}(?:\s\d{4}){3}$/, t("errors.cardNumber")),
      expiryDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\s\/\s\d{2}$/, t("errors.expiryDate")),
      cvc: z.string().regex(/^\d{3}$/, t("errors.cvc")),
    })
    .refine(
      (data) => !data.checkIn || !data.checkOut || data.checkOut > data.checkIn,
      {
        message: t("errors.checkOut"),
        path: ["checkOut"],
      },
    );

const defaultValues: BookingFormValues = {
  fullName: "Jonathan Aris",
  email: "jonathan@example.com",
  phone: "+62 812 3456 789",
  requests: "Dietary requirements, early check-in, or high-floor preference...",
  checkIn: "",
  checkOut: "",
  paymentMethod: "card",
  cardNumber: "0000 0000 0000 0000",
  expiryDate: "MM / YY",
  cvc: "123",
};

export function BookingForm() {
  const t = useTranslations("booking.form");
  const { setForm } = useBookingStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(createBookingFormSchema(t)),
    defaultValues,
    mode: "onBlur",
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (values: BookingFormValues) => {
    setForm(values);
  };

  return (
    <form
      className="space-y-8 rounded-4xl bg-surface-container-lowest p-6 shadow-card"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Badge>1</Badge>
          <h2 className="text-xl font-semibold text-on-surface">
            {t("guestDetails")}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t("fullName")} error={errors.fullName?.message}>
            <Input
              {...register("fullName")}
              placeholder={t("fullNamePlaceholder")}
              aria-invalid={Boolean(errors.fullName)}
            />
          </Field>
          <Field label={t("email")} error={errors.email?.message}>
            <Input
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
          <Field label={t("phone")} error={errors.phone?.message}>
            <Input
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              aria-invalid={Boolean(errors.phone)}
            />
          </Field>
          <Field
            label={t("requests")}
            error={errors.requests?.message}
            className="md:col-span-2"
          >
            <Input
              {...register("requests")}
              placeholder={t("requestsPlaceholder")}
              aria-invalid={Boolean(errors.requests)}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Badge>2</Badge>
          <h2 className="text-xl font-semibold text-on-surface">
            {t("travelDates")}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t("checkIn")} error={errors.checkIn?.message}>
            <Input
              type="date"
              {...register("checkIn")}
              aria-invalid={Boolean(errors.checkIn)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
          <Field label={t("checkOut")} error={errors.checkOut?.message}>
            <Input
              type="date"
              {...register("checkOut")}
              aria-invalid={Boolean(errors.checkOut)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Badge>3</Badge>
          <h2 className="text-xl font-semibold text-on-surface">
            {t("paymentMethod")}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <ToggleChip
            active={paymentMethod === "card"}
            onClick={() =>
              setValue("paymentMethod", "card", { shouldValidate: true })
            }
            icon={<CreditCard className="h-4 w-4" />}
            label={t("paymentCard")}
          />
          <ToggleChip
            active={paymentMethod === "wallet"}
            onClick={() =>
              setValue("paymentMethod", "wallet", { shouldValidate: true })
            }
            icon={<WalletCards className="h-4 w-4" />}
            label={t("paymentWallet")}
          />
        </div>

        <div className="space-y-4 rounded-[1.5rem] bg-surface-container-low p-5">
          <Field label={t("cardNumber")} error={errors.cardNumber?.message}>
            <Input
              {...register("cardNumber")}
              aria-invalid={Boolean(errors.cardNumber)}
            />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t("expiryDate")} error={errors.expiryDate?.message}>
              <Input
                {...register("expiryDate")}
                aria-invalid={Boolean(errors.expiryDate)}
              />
            </Field>
            <Field label={t("cvv")} error={errors.cvc?.message}>
              <Input {...register("cvc")} aria-invalid={Boolean(errors.cvc)} />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-3 text-sm text-on-surface-variant">
        <span className="mt-0.5 inline-block h-3 w-3 rounded-full bg-primary" />
        <p>{t("securePayment")}</p>
      </div>

      <Button
        size="lg"
        className="w-full md:w-auto"
        type="submit"
        disabled={isSubmitting}
      >
        {t("submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
  className,
  error,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {error ? <p className="mt-2 text-xs text-error">{error}</p> : null}
    </div>
  );
}

function ToggleChip({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2 text-sm font-semibold text-on-secondary-container"
          : "inline-flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface-variant"
      }
    >
      {icon}
      {label}
    </button>
  );
}

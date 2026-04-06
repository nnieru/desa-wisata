import { create } from "zustand";

import type { BookingFormState } from "@/types/booking";

type BookingStore = {
  form: BookingFormState;
  setField: <K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K],
  ) => void;
  setForm: (form: Partial<BookingFormState>) => void;
  reset: () => void;
};

const initialForm: BookingFormState = {
  fullName: "Jonathan Aris",
  email: "jonathan@example.com",
  phone: "+62 812 3456 789",
  requests: "Dietary requirements, early check-in, or high-floor preference...",
  checkIn: "2024-06-12",
  checkOut: "2024-06-18",
  guests: "2 Adults, 0 Children",
  paymentMethod: "card",
  cardNumber: "0000 0000 0000 0000",
  expiryDate: "MM / YY",
  cvc: "123",
};

export const useBookingStore = create<BookingStore>((set) => ({
  form: initialForm,
  setField: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    })),
  setForm: (form) =>
    set((state) => ({
      form: {
        ...state.form,
        ...form,
      },
    })),
  reset: () => set({ form: initialForm }),
}));

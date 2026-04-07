export type BookingFormState = {
  fullName: string;
  email: string;
  phone: string;
  requests: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  paymentMethod: "card" | "wallet";
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

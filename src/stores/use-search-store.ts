import { create } from "zustand";

export type SearchStore = {
  query: string;
  priceRange: string;
  experience: string[];
  rating: number;
  selectedDestinationSlug: string | null;
  checkIn: string;
  checkOut: string;
  setQuery: (query: string) => void;
  setPriceRange: (priceRange: string) => void;
  toggleExperience: (experience: string) => void;
  setRating: (rating: number) => void;
  setSelectedDestinationSlug: (slug: string | null) => void;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
  reset: () => void;
};

const initialState = {
  query: "",
  priceRange: "50-150",
  experience: ["Heritage"],
  rating: 4,
  selectedDestinationSlug: "ubud-sanctuary",
  checkIn: "",
  checkOut: "",
};

export const useSearchStore = create<SearchStore>((set) => ({
  ...initialState,
  setQuery: (query) => set({ query }),
  setPriceRange: (priceRange) => set({ priceRange }),
  toggleExperience: (experience) =>
    set((state) => ({
      experience: state.experience.includes(experience)
        ? state.experience.filter((item) => item !== experience)
        : [...state.experience, experience],
    })),
  setRating: (rating) => set({ rating }),
  setSelectedDestinationSlug: (selectedDestinationSlug) =>
    set({ selectedDestinationSlug }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  reset: () => set(initialState),
}));

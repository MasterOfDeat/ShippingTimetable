import type { Sailing } from "../types/sailing";

export const sailings: Sailing[] = [
  {
  id: 1,
  carrier: "MSC",
  origin: "CNSHA",
  destination: "NLRTM",
  status: "ACTIVE",

  departure: {
    local: "2026-11-10T09:00:00",
    utcOffset: null,
    precision: "datetime",
  },

  arrival: {
    local: "2026-12-08T14:00:00",
    utcOffset: null,
    precision: "datetime",
  },

  transitDays: 28,
  transshipments: 0,
},
  {
  id: 4,
  carrier: "EVERGREEN",
  origin: "CNNGB",
  destination: "NLRTM",
  status: "ACTIVE",

  departure: {
    local: "2026-11-12T00:00:00",
    utcOffset: null,
    precision: "date",
  },

  arrival: {
    local: "2026-12-11T00:00:00",
    utcOffset: null,
    precision: "date",
  },

  transitDays: 29,
  transshipments: 1,
}
];
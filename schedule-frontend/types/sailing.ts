export type SailingStatus =
  | "ACTIVE"
  | "NOT_IN_LATEST";

export type DatePrecision =
  | "date"
  | "datetime";

export interface SailingDateTime {
  local: string;
  utcOffset: string | null;
  precision: DatePrecision;
}

export interface Sailing {
  id: number;

  carrier: string;

  origin: string;
  destination: string;

  status: SailingStatus;

  departure: SailingDateTime;
  arrival: SailingDateTime;

  transitDays: number;
  transshipments: number;
}
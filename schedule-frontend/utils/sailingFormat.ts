import type { SailingDateTime } from "../types/sailing";

export function formatSailingDateTime(
  value: SailingDateTime,
) {
  const [date, time] = value.local.split("T");
  const [year, month, day] = date.split("-");

  return {
    date: `${day}.${month}.${year}`,

    time:
      value.precision === "datetime"
        ? time.slice(0, 5)
        : null,
  };
}

export function formatTransshipments(
  count: number,
) {
  if (count === 0) {
    return "Без пересадок";
  }

  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (
    lastTwo >= 11 &&
    lastTwo <= 14
  ) {
    return `${count} пересадок`;
  }

  if (lastOne === 1) {
    return `${count} пересадка`;
  }

  if (
    lastOne >= 2 &&
    lastOne <= 4
  ) {
    return `${count} пересадки`;
  }

  return `${count} пересадок`;
}
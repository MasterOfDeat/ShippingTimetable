import Link from "next/link";

import { sailings } from "../../data/sailings";

import RouteCard from "../../components/RouteCard";

import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import FilterControls from "./FilterControls";

import styles from "./page.module.css";

type SearchParams = {
  origin?: string;
  destination?: string;

  dateFrom?: string;
  dateTo?: string;

  carrier?: string;
  transshipments?: string;
  maxDuration?: string;

  sort?: string;
  order?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const {
    origin,
    destination,
    dateFrom,
    dateTo,

    carrier,
    transshipments,
    maxDuration,

    sort = "departure",
    order = "asc",
  } = params;

  const searchQueryParams = new URLSearchParams();

  if (origin) {
    searchQueryParams.set("origin", origin);
  }

  if (destination) {
    searchQueryParams.set("destination", destination);
  }

  if (dateFrom) {
    searchQueryParams.set("dateFrom", dateFrom);
  }

  if (dateTo) {
    searchQueryParams.set("dateTo", dateTo);
  }

  const resultsQueryParams = new URLSearchParams(searchQueryParams);

  if (carrier) {
    resultsQueryParams.set("carrier", carrier);
  }

  if (transshipments) {
    resultsQueryParams.set("transshipments", transshipments);
  }

  if (maxDuration) {
    resultsQueryParams.set("maxDuration", maxDuration);
  }

  resultsQueryParams.set("sort", sort);
  resultsQueryParams.set("order", order);

  const resultsQuery = resultsQueryParams.toString();

  const resultsUrl = `/search?${resultsQuery}`;

  const filteredSailings = sailings.filter((sailing) => {
    const departureDate = sailing.departure.local.split("T")[0];

    const matchesOrigin = !origin || sailing.origin === origin;

    const matchesDestination =
      !destination || sailing.destination === destination;

    const matchesDateFrom = !dateFrom || departureDate >= dateFrom;

    const matchesDateTo = !dateTo || departureDate <= dateTo;

    const matchesCarrier = !carrier || sailing.carrier === carrier;

    const matchesTransshipments =
      !transshipments ||
      (transshipments === "direct"
        ? sailing.transshipments === 0
        : sailing.transshipments > 0);

    const durationLimit = maxDuration ? Number(maxDuration) : null;

    const matchesDuration =
      durationLimit === null || sailing.transitDays <= durationLimit;

    return (
      matchesOrigin &&
      matchesDestination &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesCarrier &&
      matchesTransshipments &&
      matchesDuration
    );
  });

  const sortedSailings = [...filteredSailings].sort((a, b) => {
    let result: number;

    if (sort === "arrival") {
      result =
        new Date(a.arrival.local).getTime() -
        new Date(b.arrival.local).getTime();
    } else if (sort === "duration") {
      result = a.transitDays - b.transitDays;
    } else {
      result =
        new Date(a.departure.local).getTime() -
        new Date(b.departure.local).getTime();
    }

    return order === "desc" ? -result : result;
  });

  const carriers = [
    ...new Set(sailings.map((sailing) => sailing.carrier)),
  ].sort();

  return (
    <section className={styles.results}>
      <div className={styles.breadcrumbs}>
        <Link href="https://cargotime.ru/tracking">Главная</Link>

        <span>—</span>

        <Link href="/#search">Поиск рейсов</Link>

        <span>—</span>

        <Link href={resultsUrl}>Результаты поиска</Link>
      </div>

      <SearchBar />

      <div className={styles.searchLayout}>
        <FilterControls
          carriers={carriers}
          resultsCount={filteredSailings.length}
        />

        <div className={styles.resultsColumn}>
          <SortControls />

          {filteredSailings.length === 0 ? (
            <div className={styles.empty}>
              <h2>Рейсы не найдены</h2>

              <p>Попробуйте изменить параметры поиска или фильтры.</p>
            </div>
          ) : (
            <div className={styles.list}>
              {sortedSailings.map((sailing) => (
                <RouteCard
                  key={sailing.id}
                  sailing={sailing}
                  searchQuery={resultsQuery}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

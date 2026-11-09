"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentOrigin = searchParams.get("origin") ?? "";

  const currentDestination = searchParams.get("destination") ?? "";

  const currentDateFrom = searchParams.get("dateFrom") ?? "";

  const currentDateTo = searchParams.get("dateTo") ?? "";

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(searchParams.toString());

    const origin = formData.get("origin")?.toString() ?? "";

    const destination = formData.get("destination")?.toString() ?? "";

    const dateFrom = formData.get("dateFrom")?.toString() ?? "";

    const dateTo = formData.get("dateTo")?.toString() ?? "";

    if (dateFrom && dateTo && dateFrom > dateTo) {
      alert("Дата окончания периода не может быть раньше даты начала.");

      return;
    }

    setOrDelete(params, "origin", origin);
    setOrDelete(params, "destination", destination);
    setOrDelete(params, "dateFrom", dateFrom);
    setOrDelete(params, "dateTo", dateTo);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="searchOrigin">Откуда</label>

        <select
          id="searchOrigin"
          name="origin"
          defaultValue={currentOrigin}
          required
        >
          <option value="" disabled>
            Выберите порт
          </option>

          <option value="CNSHA">Шанхай (CNSHA)</option>

          <option value="CNNGB">Нинбо (CNNGB)</option>
        </select>
      </div>

      <div className={styles.arrow}>→</div>

      <div className={styles.field}>
        <label htmlFor="searchDestination">Куда</label>

        <select
          id="searchDestination"
          name="destination"
          defaultValue={currentDestination}
          required
        >
          <option value="" disabled>
            Выберите порт
          </option>

          <option value="NLRTM">Роттердам (NLRTM)</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="searchDateFrom">Дата с</label>

        <input
          id="searchDateFrom"
          name="dateFrom"
          type="date"
          defaultValue={currentDateFrom}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="searchDateTo">Дата по</label>

        <input
          id="searchDateTo"
          name="dateTo"
          type="date"
          min={currentDateFrom || undefined}
          defaultValue={currentDateTo}
        />
      </div>

      <button type="submit" className={styles.searchButton}>
        Найти
      </button>
    </form>
  );
}

function setOrDelete(params: URLSearchParams, name: string, value: string) {
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
}

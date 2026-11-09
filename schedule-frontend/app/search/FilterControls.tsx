"use client";

import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./FilterControls.module.css";

type FilterControlsProps = {
  carriers: string[];
  resultsCount: number;
};

export default function FilterControls({
  carriers,
  resultsCount,
}: FilterControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const currentCarrier = searchParams.get("carrier") ?? "";

  const currentTransshipments = searchParams.get("transshipments") ?? "";

  const currentMaxDuration = searchParams.get("maxDuration") ?? "";

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(searchParams.toString());

    const carrier = formData.get("carrier")?.toString() ?? "";

    const transshipments = formData.get("transshipments")?.toString() ?? "";

    const maxDuration = formData.get("maxDuration")?.toString() ?? "";

    setOrDelete(params, "carrier", carrier);

    setOrDelete(params, "transshipments", transshipments);

    setOrDelete(params, "maxDuration", maxDuration);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    setIsOpen(false);
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("carrier");
    params.delete("transshipments");
    params.delete("maxDuration");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={styles.mobileOpenButton}
        onClick={() => setIsOpen(true)}
      >
        <span>Фильтры</span>
        <span className={styles.countBadge}>{resultsCount}</span>
      </button>

      <aside className={`${styles.filters} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <div>
            <h2>Фильтры</h2>

            <p>
              Найдено рейсов: <strong>{resultsCount}</strong>
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть фильтры"
          >
            ×
          </button>
        </div>

        <form
          key={searchParams.toString()}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="carrier">Линия</label>

            <select id="carrier" name="carrier" defaultValue={currentCarrier}>
              <option value="">Все линии</option>

              {carriers.map((carrier) => (
                <option key={carrier} value={carrier}>
                  {carrier}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="transshipments">Пересадки</label>

            <select
              id="transshipments"
              name="transshipments"
              defaultValue={currentTransshipments}
            >
              <option value="">Все варианты</option>

              <option value="direct">Без пересадок</option>

              <option value="withTransfers">С пересадками</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="maxDuration">Длительность до, дней</label>

            <input
              id="maxDuration"
              name="maxDuration"
              type="number"
              min="1"
              placeholder="Например, 30"
              defaultValue={currentMaxDuration}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.applyButton}>
              Применить
            </button>

            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Сбросить
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function setOrDelete(params: URLSearchParams, name: string, value: string) {
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
}

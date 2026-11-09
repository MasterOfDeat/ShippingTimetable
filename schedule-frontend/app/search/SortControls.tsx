"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import styles from "./SortControls.module.css";

export default function SortControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sort") ?? "departure";

  const currentOrder =
    searchParams.get("order") ?? "asc";

  function handleSubmit(
  event: React.SubmitEvent<HTMLFormElement>,
) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const sort = formData.get("sort")?.toString();
    const order = formData.get("order")?.toString();

    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (sort) {
      params.set("sort", sort);
    }

    if (order) {
      params.set("order", order);
    }

    router.replace(
      `${pathname}?${params.toString()}`,
      {
        scroll: false,
      },
    );
  }

  return (
    <div className={styles.toolbar}>
      <span>Сортировка</span>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <select
          name="sort"
          defaultValue={currentSort}
        >
          <option value="departure">
            По времени отправления
          </option>

          <option value="arrival">
            По времени прибытия
          </option>

          <option value="duration">
            По длительности
          </option>
        </select>

        <select
          name="order"
          defaultValue={currentOrder}
        >
          <option value="asc">
            По возрастанию
          </option>

          <option value="desc">
            По убыванию
          </option>
        </select>

        <button type="submit">
          Применить
        </button>
      </form>
    </div>
  );
}
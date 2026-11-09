import Link from "next/link";
import styles from "./page.module.css";

type SearchParams = {
  origin?: string;
  destination?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const { origin, destination, dateFrom, dateTo } = params;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.breadcrumbs}>
            <Link href="https://cargotime.ru/tracking">Главная</Link>
            <span>—</span>
            <strong>Поиск рейсов</strong>
          </p>

          <h1 className={styles.title}>
            Найдите подходящий
            <span> морской рейс</span>
          </h1>

          <p className={styles.description}>
            Выберите порт отправления, порт назначения и период поездки. Сервис
            покажет доступные варианты и поможет подобрать удобный маршрут.
          </p>
        </div>
      </section>

      <section id="search" className={styles.searchSection}>
        <div className={styles.searchCard}>
          <div className={styles.searchHeader}>
            <div>
              <h2>Поиск рейсов</h2>
              <p>Укажите основные параметры маршрута</p>
            </div>

            <div className={styles.arrow}>↗</div>
          </div>

          <form action="/search" method="GET">
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor="departurePort">Откуда</label>

                <select
                  id="departurePort"
                  name="origin"
                  defaultValue={origin ?? ""}
                  required
                >
                  <option value="" disabled>
                    Выберите порт
                  </option>

                  <option value="CNSHA">Шанхай (CNSHA)</option>

                  <option value="CNNGB">Нинбо (CNNGB)</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="arrivalPort">Куда</label>

                <select
                  id="arrivalPort"
                  name="destination"
                  defaultValue={destination ?? ""}
                  required
                >
                  <option value="" disabled>
                    Выберите порт
                  </option>

                  <option value="NLRTM">Роттердам (NLRTM)</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="dateFrom">Дата с</label>

                <input
                  id="dateFrom"
                  name="dateFrom"
                  type="date"
                  defaultValue={dateFrom ?? ""}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="dateTo">Дата по</label>

                <input
                  id="dateTo"
                  name="dateTo"
                  type="date"
                  defaultValue={dateTo ?? ""}
                />
              </div>
            </div>

            <div className={styles.searchFooter}>
              <button type="submit">Найти рейсы</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
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
            Выберите порт отправления, порт назначения и период поездки.
            Сервис покажет доступные варианты и поможет подобрать удобный
            маршрут.
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

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor="departurePort">
                Откуда
              </label>

              <select id="departurePort" defaultValue="">
                <option value="" disabled>
                  Выберите порт
                </option>

                <option value="klaipeda">
                  Клайпеда
                </option>

                <option value="kiel">
                  Киль
                </option>

                <option value="stockholm">
                  Стокгольм
                </option>

                <option value="helsinki">
                  Хельсинки
                </option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="arrivalPort">
                Куда
              </label>

              <select id="arrivalPort" defaultValue="">
                <option value="" disabled>
                  Выберите порт
                </option>

                <option value="klaipeda">
                  Клайпеда
                </option>

                <option value="kiel">
                  Киль
                </option>

                <option value="stockholm">
                  Стокгольм
                </option>

                <option value="helsinki">
                  Хельсинки
                </option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="dateFrom">
                Дата с
              </label>

              <input
                id="dateFrom"
                type="date"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="dateTo">
                Дата по
              </label>

              <input
                id="dateTo"
                type="date"
              />
            </div>
          </div>

          <div className={styles.searchFooter}>
            <button type="button">
              Найти рейсы
            </button>
          </div>
        </div>
      </section>

    </>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";

import { sailings } from "../../../data/sailings";
import { getPortName } from "../../../data/ports";

import type { SailingDateTime } from "../../../types/sailing";

import {
  formatSailingDateTime,
  formatTransshipments,
} from "../../../utils/sailingFormat";

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

type RoutePageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<SearchParams>;
};

export default async function RoutePage({
  params,
  searchParams,
}: RoutePageProps) {
  const { id } = await params;
  const query = await searchParams;
  const backParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      backParams.set(key, value);
    }
  });

  const backUrl = backParams.toString()
    ? `/search?${backParams.toString()}`
    : "/search";

  const sailing = sailings.find((item) => item.id === Number(id));

  if (!sailing) {
    notFound();
  }

  const departure = formatSailingDateTime(sailing.departure);

  const arrival = formatSailingDateTime(sailing.arrival);

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Главная</Link>

        <span>—</span>

        <Link href="/#search">Поиск рейсов</Link>

        <span>—</span>

        <Link href={backUrl}>Результаты поиска</Link>

        <span>—</span>

        <span>Рейс {sailing.id}</span>
      </div>

      <div className={styles.header}>
        <div>
          <span className={styles.carrier}>{sailing.carrier}</span>

          <h1>
            {getPortName(sailing.origin)}
            <span> → </span>
            {getPortName(sailing.destination)}
          </h1>
          <p className={styles.codes}>
            {sailing.origin} → {sailing.destination}
          </p>

          <p>Подробная информация о выбранном рейсе</p>
        </div>

        <span
          className={
            sailing.transshipments === 0 ? styles.direct : styles.transfer
          }
        >
          {formatTransshipments(sailing.transshipments)}
        </span>
      </div>

      <div className={styles.routeCard}>
        <div className={styles.point}>
          <span className={styles.label}>Отправление</span>

          <strong>{departure.date}</strong>

          {departure.time && (
            <span className={styles.time}>{departure.time}</span>
          )}

          <span className={styles.port}>
            {getPortName(sailing.origin)}
            <small>{sailing.origin}</small>
          </span>
        </div>

        <div className={styles.routeLine}>
          <span />
          <div />
          <span />
        </div>

        <div className={`${styles.point} ${styles.arrival}`}>
          <span className={styles.label}>Прибытие</span>

          <strong>{arrival.date}</strong>

          {arrival.time && <span className={styles.time}>{arrival.time}</span>}

          <span className={styles.port}>
            {getPortName(sailing.destination)}
            <small>{sailing.destination}</small>
          </span>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detail}>
          <span>Линия</span>
          <strong>{sailing.carrier}</strong>
        </div>

        <div className={styles.detail}>
          <span>Длительность</span>
          <strong>{sailing.transitDays} дн.</strong>
        </div>

        <div className={styles.detail}>
          <span>Пересадки</span>
          <strong>
            {sailing.transshipments === 0 ? "Нет" : sailing.transshipments}
          </strong>
        </div>

        <div className={styles.detail}>
          <span>Статус</span>
          <strong>
            {sailing.status === "ACTIVE"
              ? "Активен"
              : "Не найден в последнем обновлении"}
          </strong>
        </div>
      </div>

      <Link href={backUrl} className={styles.backButton}>
        ← Вернуться к результатам
      </Link>
    </section>
  );
}

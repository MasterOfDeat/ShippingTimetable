import Link from "next/link";

import type { Sailing, SailingDateTime } from "../types/sailing";
import { getPortName } from "../data/ports";

import styles from "./RouteCard.module.css";

import {
  formatSailingDateTime,
  formatTransshipments,
} from "../utils/sailingFormat";

interface RouteCardProps {
  sailing: Sailing;
  searchQuery?: string;
}

export default function RouteCard({ sailing, searchQuery }: RouteCardProps) {
  const departure = formatSailingDateTime(sailing.departure);

  const arrival = formatSailingDateTime(sailing.arrival);

  const detailsUrl = searchQuery
    ? `/routes/${sailing.id}?${searchQuery}`
    : `/routes/${sailing.id}`;
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <div>
          <span className={styles.carrier}>{sailing.carrier}</span>

          <h2>
            {getPortName(sailing.origin)}
            <span> → </span>
            {getPortName(sailing.destination)}
          </h2>

          <p className={styles.portCodes}>
            {sailing.origin} → {sailing.destination}
          </p>
        </div>

        <span
          className={
            sailing.transshipments === 0 ? styles.direct : styles.transfer
          }
        >
          {formatTransshipments(sailing.transshipments)}
        </span>
      </div>

      <div className={styles.schedule}>
        <div>
          <span className={styles.label}>Отправление</span>

          <div className={styles.dateTime}>
            <strong>{departure.date}</strong>
            {departure.time && <span>{departure.time}</span>}
          </div>
        </div>

        <div className={styles.routeLine}>
          <span />
          <div />
          <span />
        </div>

        <div className={styles.arrival}>
          <span className={styles.label}>Прибытие</span>

          <div className={styles.dateTime}>
            <strong>{arrival.date}</strong>
            {arrival.time && <span>{arrival.time}</span>}
          </div>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.details}>
          <span>
            Длительность: <strong>{sailing.transitDays} дн.</strong>
          </span>

          <span>
            Линия: <strong>{sailing.carrier}</strong>
          </span>
        </div>

        <Link href={detailsUrl} className={styles.detailsButton}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}

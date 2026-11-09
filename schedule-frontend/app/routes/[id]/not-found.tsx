import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <span className={styles.code}>
          404
        </span>

        <h1>Рейс не найден</h1>

        <p>
          Возможно, рейс был удалён,
          изменён или указан неверный номер.
        </p>

        <Link
          href="/"
          className={styles.button}
        >
          Вернуться к поиску
        </Link>
      </div>
    </section>
  );
}
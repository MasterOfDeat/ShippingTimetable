import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="https://cargotime.ru/tracking" className={styles.logo}>
          Cargo<span>time</span>
        </Link>

        <nav className={styles.navigation}>
          <Link href="/">Поиск рейсов</Link>
        </nav>

        <Link href="/#search" className={styles.searchButton}>
          Найти рейс
        </Link>
      </div>
    </header>
  );
}
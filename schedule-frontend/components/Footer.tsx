import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Cargo<span>time</span>
        </div>

        <a
          href="https://github.com/MasterOfDeat/ShippingTimetable"
          target="_blank"
          rel="noopener noreferrer"
        >
          Сервис поиска морских рейсов
        </a>

        <p>© 2026 Васина Марина</p>
      </div>
    </footer>
  );
}

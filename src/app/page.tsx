import Trainer from "@/ui/trainer";
import styles from "./page.module.css";
import Controls from "@/ui/controls";

export default function Page() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Controls />
      </header>
      <main className={styles.main}>
        <Trainer />
      </main>
      <footer className={styles.footer}>
        Copyright Ihor T.
      </footer>
    </div>
  );
}

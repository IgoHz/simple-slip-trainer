import styles from './page.module.css';
import Trainer from '@/ui/trainer';

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Trainer />
      </main>
      <footer className={styles.footer}>Copyright Ihor T.</footer>
    </div>
  );
}

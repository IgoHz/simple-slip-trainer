import styles from './page.module.css';
import Trainer from '@/features/trainer/components/trainer';

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Trainer />
      </main>
      <footer className={styles.footer}>&#169; Ihor T.</footer>
    </div>
  );
}

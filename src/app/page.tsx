import styles from './page.module.css';
import Trainer from '@/features/trainer/components/trainer';
import Copyright from '@/components/copyright';

export default function Page() {
  return (
    <div className={styles.page}>
      <main>
        <Trainer />
      </main>
      <footer>
        <Copyright />
      </footer>
    </div>
  );
}

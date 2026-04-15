import styles from './page.module.css';
import Copyright from '@/components/copyright';
import Controls from '@/features/trainer/components/controls';
import Sectors from '@/features/trainer/components/sectors';

export default function Page() {
  return (
    <div className={styles.page}>
      <header>
        <Controls />
      </header>
      <main className={styles.main}>
        <Sectors />
      </main>
      <footer>
        <Copyright />
      </footer>
    </div>
  );
}

import styles from './trainer-page.module.css';
import { Copyright } from '@/shared/ui';
import { Controls } from '@/widgets/controls';
import { Sectors } from '@/widgets/sectors';

export default function TrainerPage() {
  return (
    <div className={styles.page}>
      <header>
        <Controls />
      </header>
      <main className={styles.main}>
        <Sectors />
      </main>
      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  );
}

import Controls from './trainer/controls';
import Sectors from './trainer/sectors';
import styles from './trainer.module.css';

export default function Trainer() {
  return (
    <div className={styles.trainer}>
      <Controls />
      <Sectors />
    </div>
  );
}

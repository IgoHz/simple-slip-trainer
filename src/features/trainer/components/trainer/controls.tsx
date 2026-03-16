import RateCounter from './controls/rate-counter';
import styles from './controls.module.css';
import StopwatchControl from './controls/stopwatch';

export default function Controls() {
  return (
    <div className={styles.controls}>
      <RateCounter />
      <StopwatchControl />
    </div>
  );
}

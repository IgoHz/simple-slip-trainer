import RateCounter from "./rate-counter";
import styles from './controls.module.css';
import StopwatchControl from "./stopwatch-control";

export default function Controls() {
  return (
    <div className={styles.controls}>
      <RateCounter />
      <StopwatchControl />
    </div>
  );
}
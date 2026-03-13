import RateCounter from "./rate-counter";
import styles from './trainer-controls.module.css';
import StopwatchControl from "./stopwatch";

export default function TrainerControls() {
  return (
    <div className={styles.trainerControls}>
      <RateCounter />
      <StopwatchControl />
    </div>
  );
}
import RateCounter from './controls/rate-counter';
import styles from './controls.module.css';
import Stopwatch from './controls/stopwatch';
import Wrapper from '@/components/wrapper';

export default function Controls() {
  return (
    <Wrapper className={styles.controls}>
      <label>Simple Slip Trainer</label>
      <RateCounter />
      <Stopwatch />
    </Wrapper>
  );
}

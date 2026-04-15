'use client';

import Wrapper from '@/components/wrapper';
import RateCounter from './controls/rate-counter';
import Stopwatch from './controls/stopwatch';
import styles from './controls.module.css';
import { useCallback, useState } from 'react';
import ExpandButton from './controls/expand-button';

export default function Controls() {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  }, []);

  return (
    <Wrapper
      className={`${styles.controls} ${isExpanded ? styles.expanded : ''}`}
    >
      <ExpandButton
        className={styles.expandButton}
        isExpanded={isExpanded}
        onClick={handleExpandClick}
      />
      <label className={styles.mobileLabel}>SST</label>
      <label className={styles.desktopLabel}>Simple Slip Trainer</label>
      <RateCounter className={styles.rateCounter} />
      <Stopwatch className={styles.stopwatch} />
    </Wrapper>
  );
}

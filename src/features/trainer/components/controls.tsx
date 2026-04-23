'use client';

import Wrapper from '@/components/wrapper';
import RateCounter from './controls/rate-counter';
import Stopwatch from './controls/stopwatch';
import styles from './controls.module.css';
import { useCallback, useState } from 'react';
import ExpandButton from './controls/expand-button';

export default function Controls() {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <h1 className={styles.mobileLabel}>SST</h1>
      <h1 className={styles.desktopLabel}>Simple Slip Trainer</h1>
      <RateCounter className={styles.rateCounter} />
      <Stopwatch className={styles.stopwatch} />
    </Wrapper>
  );
}

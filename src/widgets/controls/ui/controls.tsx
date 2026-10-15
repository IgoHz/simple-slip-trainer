'use client';

import { useCallback, useState } from 'react';
import styles from './controls.module.css';
import { PaddingWrapper } from '@/shared/ui';
import { RateCounter } from '@/features/adjust-rate';
import { Stopwatch } from '@/features/manage-stopwatch';
import ExpandButton from './expand-button';

export interface ControlsProps {
  className?: string;
}

export default function Controls({ className }: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  }, []);

  return (
    <PaddingWrapper
      className={`${styles.controls} ${isExpanded ? styles.expanded : ''} ${className ?? ''}`}
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
    </PaddingWrapper>
  );
}

'use client';

import { useCallback, useState } from 'react';
import clsx from 'clsx';
import styles from './controls.module.css';
import { PaddingWrapper } from '@/shared/ui';
import { ModeSelector } from '@/features/select-mode';
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
      className={clsx(
        styles.controls,
        isExpanded && styles.expanded,
        className
      )}
    >
      <ExpandButton
        className={styles.expandButton}
        isExpanded={isExpanded}
        onClick={handleExpandClick}
      />
      <h1 className="text-base content-center md:hidden">SST</h1>
      <h1 className="hidden text-base content-center md:block">
        Simple Slip Trainer
      </h1>
      <ModeSelector className={styles.modeSelector} />
      <RateCounter className={styles.rateCounter} />
      <Stopwatch className={styles.stopwatch} />
    </PaddingWrapper>
  );
}

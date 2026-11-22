'use client';

import { useCallback, useState } from 'react';
import clsx from 'clsx';
import styles from './controls.module.css';
import { PaddingWrapper } from '@/shared/ui';
import { ModeSelector } from '@/features/select-mode';
import { RateCounter } from '@/features/adjust-rate';
import { Stopwatch } from '@/features/manage-stopwatch';
import { CombinationManager, MenuButton } from '@/features/manage-combinations';
import ExpandButton from './expand-button';
import { ThemeToggle } from './theme-toggle';

export interface ControlsProps {
  className?: string;
}

export default function Controls({ className }: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  const handleExpandClick = useCallback(() => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  }, []);

  const handleOpenManager = useCallback(() => {
    setIsManagerOpen(true);
  }, []);

  const handleCloseManager = useCallback(() => {
    setIsManagerOpen(false);
  }, []);

  return (
    <>
      <PaddingWrapper
        className={clsx(
          styles.controls,
          isExpanded && styles.expanded,
          className
        )}
      >
        <MenuButton className={styles.menuButton} onClick={handleOpenManager} />
        <h1
          className={clsx('text-base content-center md:hidden', styles.title)}
        >
          SST
        </h1>
        <h1
          className={clsx(
            'hidden text-base content-center md:block',
            styles.title
          )}
        >
          Simple Slip Trainer
        </h1>
        <ModeSelector className={styles.modeSelector} />
        <RateCounter className={styles.rateCounter} />
        <Stopwatch className={styles.stopwatch} />
        <ThemeToggle
          className={styles.themeSelector}
          labelClassName={styles.themeLabel}
        />
        <ExpandButton
          className={styles.expandButton}
          isExpanded={isExpanded}
          onClick={handleExpandClick}
        />
      </PaddingWrapper>
      <CombinationManager isOpen={isManagerOpen} onClose={handleCloseManager} />
    </>
  );
}

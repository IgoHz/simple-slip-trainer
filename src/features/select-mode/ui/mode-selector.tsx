'use client';

import { memo, useCallback } from 'react';
import styles from './mode-selector.module.css';
import { Button } from '@/shared/ui';
import {
  modeSelector,
  setModeSelector,
  TrainingMode,
  useSessionStore
} from '@/entities/session';
import { useStoreAsync } from '@/shared/lib';

export interface ModeSelectorProps {
  className?: string;
}

const MODES: Array<{ mode: TrainingMode; label: string; ariaLabel: string }> = [
  {
    mode: TrainingMode.RANDOM_SINGLES,
    label: 'Singles',
    ariaLabel: 'Random singles mode'
  },
  {
    mode: TrainingMode.COMBINATIONS,
    label: 'Combos',
    ariaLabel: 'Combinations mode'
  },
  {
    mode: TrainingMode.MIXED,
    label: 'Mixed',
    ariaLabel: 'Mixed mode'
  }
];

export function ModeSelector({ className }: ModeSelectorProps) {
  const currentMode =
    useStoreAsync(useSessionStore, modeSelector) ?? TrainingMode.RANDOM_SINGLES;
  const setMode = useSessionStore(setModeSelector);

  const handleModeChange = useCallback(
    (mode: TrainingMode) => {
      setMode(mode);
    },
    [setMode]
  );

  return (
    <div
      className={`${styles.modeSelector} ${className ?? ''}`}
      role="group"
      aria-label="Training mode"
    >
      <span className={styles.label}>Mode:</span>
      <div className={styles.buttonGroup}>
        {MODES.map(({ mode, label, ariaLabel }) => {
          const isActive = currentMode === mode;
          return (
            <Button
              key={mode}
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              aria-label={ariaLabel}
              aria-pressed={isActive}
              label={label}
              onClick={() => handleModeChange(mode)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ModeSelector);

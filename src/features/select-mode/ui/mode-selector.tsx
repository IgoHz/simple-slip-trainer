'use client';

import { memo, useCallback } from 'react';
import clsx from 'clsx';
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
      className={clsx(
        'flex items-center',
        'gap-[var(--padding-normal)]',
        'portrait:justify-center',
        className
      )}
      role="group"
      aria-label="Training mode"
    >
      <span className="text-sm">Mode:</span>
      <div className="flex gap-[var(--padding-normal)]">
        {MODES.map(({ mode, label, ariaLabel }) => {
          const isActive = currentMode === mode;
          return (
            <Button
              key={mode}
              className={clsx(
                '!px-[6px] !py-[var(--padding-normal)]',
                '!text-xs !leading-[0.875rem]',
                isActive && '!bg-theme-text',
                isActive && '!border-theme-text',
                isActive && '!text-theme-background'
              )}
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

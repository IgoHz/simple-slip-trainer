import { memo } from 'react';
import clsx from 'clsx';
import { CombinationPunch } from '@/entities/combination';
import { SectorPosition, toPunchType } from '@/entities/sector';
import { Icon } from '@/shared/ui';
import {
  getPunchLevel,
  isStraightPunch,
  PUNCH_LABELS,
  PUNCH_POSITION_LABELS,
  PUNCH_SHORT_LABELS,
  PunchLevel
} from '../model/punch-helpers';

export interface PunchBadgeProps {
  punch: CombinationPunch;
  className?: string;
  compact?: boolean;
  showIcon?: boolean;
}

export function PunchBadge({
  punch,
  className,
  compact = true,
  showIcon = true
}: PunchBadgeProps) {
  const punchType = toPunchType(punch);
  const isStraight = isStraightPunch(punchType);
  const level = getPunchLevel(punch);
  const isUpper = level === PunchLevel.UPPER;

  const positionLabel =
    punch in PUNCH_POSITION_LABELS
      ? PUNCH_POSITION_LABELS[punch as SectorPosition]
      : `${isUpper ? 'Upper' : 'Lower'} ${PUNCH_LABELS[punchType]}`;

  const label = compact ? PUNCH_SHORT_LABELS[punchType] : positionLabel;

  const punchIconName = isStraight
    ? 'arrowRight'
    : punchType === 'leftHook'
      ? 'hookLeft'
      : 'hookRight';

  const punchTypeIcon = isStraight ? '→' : punchType === 'leftHook' ? '↶' : '↷';
  const levelIcon = isUpper ? '↑' : '↓';

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center font-sans select-none',
        'gap-1 px-1.5 py-0.5 text-xs uppercase tracking-wider',
        'border-2 transition-colors',
        isStraight
          ? 'border-theme-border bg-theme-background text-theme-text font-medium'
          : 'border-theme-text bg-theme-text text-theme-background font-bold',
        className
      )}
      title={`${positionLabel} (${isStraight ? 'Straight' : 'Hook'}, ${isUpper ? 'Higher/Upper' : 'Lower'})`}
      data-punch-type={punchType}
      data-is-straight={isStraight}
      data-level={level}
      data-is-upper={isUpper}
      data-is-lower={!isUpper}
    >
      <span
        className={clsx(
          'inline-flex items-center shrink-0',
          isUpper ? 'opacity-90' : 'opacity-100'
        )}
        title={isUpper ? 'Higher punch' : 'Lower punch'}
      >
        <Icon
          iconName={isUpper ? 'arrowUp' : 'arrowDown'}
          className="w-2.5 h-2.5 shrink-0"
        />
        <span className="sr-only">{levelIcon}</span>
      </span>
      {showIcon && (
        <span className="inline-flex items-center shrink-0">
          <Icon iconName={punchIconName} className="w-2.5 h-2.5 shrink-0" />
          <span className="sr-only">{punchTypeIcon}</span>
        </span>
      )}
      <span>{label}</span>
    </span>
  );
}

export default memo(PunchBadge);

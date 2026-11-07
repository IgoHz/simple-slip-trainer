import clsx from 'clsx';
import styles from './sector.module.css';
import { SectorDisplayType, SectorPosition } from '../model/types';
import FistImage from './fist-image';
import { useMemo } from 'react';

const positionClasses: Record<SectorPosition, string> = {
  [SectorPosition.LEFT_UPPER]: clsx(
    'relative basis-1/2',
    'border-r border-b border-theme-border'
  ),
  [SectorPosition.LEFT_LOWER]: clsx(
    'relative basis-1/2',
    'border-r border-t border-theme-border'
  ),
  [SectorPosition.RIGHT_UPPER]: clsx(
    'relative basis-1/2',
    'border-l border-b border-theme-border'
  ),
  [SectorPosition.RIGHT_LOWER]: clsx(
    'relative basis-1/2',
    'border-l border-t border-theme-border'
  ),
  [SectorPosition.UPPER_LEFT_STRAIGHT]: clsx(
    'absolute top-0 left-1/4 right-1/4 bottom-[calc(50%+1px)]',
    'w-auto h-auto basis-auto',
    'pointer-events-none'
  ),
  [SectorPosition.UPPER_RIGHT_STRAIGHT]: clsx(
    'absolute top-0 left-1/4 right-1/4 bottom-[calc(50%+1px)]',
    'w-auto h-auto basis-auto',
    'pointer-events-none'
  ),
  [SectorPosition.LOWER_LEFT_STRAIGHT]: clsx(
    'absolute top-[calc(50%+1px)] left-1/4 right-1/4 bottom-0',
    'w-auto h-auto basis-auto',
    'pointer-events-none'
  ),
  [SectorPosition.LOWER_RIGHT_STRAIGHT]: clsx(
    'absolute top-[calc(50%+1px)] left-1/4 right-1/4 bottom-0',
    'w-auto h-auto basis-auto',
    'pointer-events-none'
  )
};

const animationClasses: Record<SectorPosition, string> = {
  [SectorPosition.LEFT_UPPER]: styles.animatedLeftHook,
  [SectorPosition.LEFT_LOWER]: styles.animatedLeftHook,
  [SectorPosition.RIGHT_UPPER]: styles.animatedRightHook,
  [SectorPosition.RIGHT_LOWER]: styles.animatedRightHook,
  [SectorPosition.UPPER_LEFT_STRAIGHT]: styles.animatedLeftStraight,
  [SectorPosition.LOWER_LEFT_STRAIGHT]: styles.animatedLeftStraight,
  [SectorPosition.UPPER_RIGHT_STRAIGHT]: styles.animatedRightStraight,
  [SectorPosition.LOWER_RIGHT_STRAIGHT]: styles.animatedRightStraight
};

export interface SectorProps {
  position: SectorPosition;
  displayType: SectorDisplayType;
  animationDuration?: string;
  className?: string;
  animationKey?: number | string;
}

export default function Sector({
  position,
  displayType,
  animationDuration,
  className,
  animationKey
}: SectorProps) {
  const style = useMemo(
    () => (animationDuration ? { animationDuration } : undefined),
    [animationDuration]
  );

  const isAnimated = displayType === SectorDisplayType.ANIMATED;

  return (
    <div className={clsx(positionClasses[position], className)}>
      <FistImage
        key={animationKey}
        className={clsx(
          'absolute top-1/2 left-1/2',
          'w-[inherit] h-4/5 portrait:w-4/5 portrait:h-[inherit]',
          'opacity-0 dark:brightness-[.7]',
          isAnimated && styles.animated,
          isAnimated && animationClasses[position]
        )}
        style={style}
      />
    </div>
  );
}

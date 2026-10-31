import styles from './sector.module.css';
import { SectorDisplayType, SectorPosition } from '../model/types';
import FistImage from './fist-image';
import { useMemo } from 'react';

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

  const sectorClass = styles.sector ?? '';
  const positionClass = styles[position] ?? '';
  const imageClass = styles.image ?? '';
  const displayClass = styles[displayType] ?? '';

  return (
    <div
      className={`${sectorClass} ${positionClass} ${className ?? ''}`.trim()}
    >
      <FistImage
        key={animationKey}
        className={`${imageClass} ${displayClass}`.trim()}
        style={style}
      />
    </div>
  );
}

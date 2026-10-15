import styles from './sector.module.css';
import { SectorDisplayType, SectorPosition } from '../model/types';
import FistImage from './fist-image';
import { useMemo } from 'react';

export interface SectorProps {
  position: SectorPosition;
  displayType: SectorDisplayType;
  animationDuration?: string;
  className?: string;
}

export default function Sector({
  position,
  displayType,
  animationDuration,
  className
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
        className={`${imageClass} ${displayClass}`.trim()}
        style={style}
      />
    </div>
  );
}

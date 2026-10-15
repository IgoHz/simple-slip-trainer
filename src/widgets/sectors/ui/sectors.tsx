'use client';

import { useState } from 'react';
import styles from './sectors.module.css';
import {
  Sector,
  SectorDisplayType,
  sectorPositionsConfig,
  sectorFactory
} from '@/entities/sector';
import {
  calcRateCoeficient,
  isPlayingSelector,
  rateSelector,
  useSessionStore
} from '@/entities/session';
import { PaddingWrapper } from '@/shared/ui';
import { useInterval, useStoreAsync } from '@/shared/lib';

export interface SectorsProps {
  className?: string;
}

export default function Sectors({ className }: SectorsProps) {
  const rate = useStoreAsync(useSessionStore, rateSelector);
  const isPlaying = useSessionStore(isPlayingSelector);

  const [activeSector, setActiveSector] = useState(sectorFactory(0, 0));

  const intervalCallback = () => {
    setActiveSector((sector) =>
      sectorFactory(sector.index, sector.repeatCount)
    );
  };

  useInterval(isPlaying, intervalCallback, calcRateCoeficient(rate) * 2 * 1000);

  function getDisplayType(index: number): SectorDisplayType {
    if (isPlaying && activeSector.index === index) {
      return SectorDisplayType.ANIMATED;
    }
    return SectorDisplayType.DEFAULT;
  }

  return (
    <PaddingWrapper className={`${styles.sectors} ${className ?? ''}`}>
      {sectorPositionsConfig.map((position, index) => (
        <Sector
          key={position}
          position={position}
          displayType={getDisplayType(index)}
          animationDuration={`${calcRateCoeficient(rate)}s`}
        />
      ))}
    </PaddingWrapper>
  );
}

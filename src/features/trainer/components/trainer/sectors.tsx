'use client';

import { SectorDisplayType } from '@/features/trainer/constants';
import Sector from './sectors/sector';
import styles from './sectors.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { useState } from 'react';
import { calcRateCoeficient } from '@/features/trainer/utils/rate';
import { useInterval } from '@/hooks/useInterval';
import { config as sectorPositionsConfig } from '../../config/sector-positions';
import { sectorFactory } from '../../utils/sector';

export default function Sectors() {
  const [state] = useTrainerControlsState();
  const { rate, isPlaying } = state;

  const [activeSector, setActiveSector] = useState(sectorFactory(0, 0));

  const intervalCallback = () => {
    setActiveSector((sector) => sectorFactory(sector.repeatCount, sector.index));
  };

  useInterval(isPlaying, intervalCallback, calcRateCoeficient(rate) * 2 * 1000);

  function getDisplayType(index: number) {
    let displayType = SectorDisplayType.STATIC;
    if (isPlaying && activeSector.index === index) {
      displayType = SectorDisplayType.ANIMATED;
    }
    return displayType;
  }

  return (
    <div className={styles.sectors}>
      {sectorPositionsConfig.map((position, index) => (
        <Sector key={position} position={position} displayType={getDisplayType(index)} />
      ))}
    </div>
  );
}

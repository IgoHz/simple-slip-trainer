'use client';

import { SectorDisplayType, SectorPosition } from '@/features/trainer/constants';
import Sector from './sectors/sector';
import styles from './sectors.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { useState } from 'react';
import { getRandomInt } from '@/utils/random';
import { calculateRateCoeficient } from '@/features/trainer/utils/rate';
import { useInterval } from '@/hooks/useInterval';

const sectorPositions: SectorPosition[] = [
  SectorPosition.LEFT_UPPER,
  SectorPosition.RIGHT_UPPER,
  SectorPosition.LEFT_LOWER,
  SectorPosition.RIGHT_LOWER
];

export default function Sectors() {
  const [state] = useTrainerControlsState();
  const { rate, isPlaying } = state;

  const [activeSectorIndex, setActiveSectorIndex] = useState(0);

  const intervalCallback = () => {
    setActiveSectorIndex(getRandomInt(sectorPositions.length));
  };

  useInterval(isPlaying, intervalCallback, calculateRateCoeficient(rate) * 2 * 1000);

  function getDisplayType(index: number) {
    let displayType = SectorDisplayType.STATIC;
    if (isPlaying && activeSectorIndex === index) {
      displayType = SectorDisplayType.ANIMATED;
    }
    return displayType;
  }

  return (
    <div className={styles.sectors}>
      {sectorPositions.map((position, index) => (
        <Sector key={position} position={position} displayType={getDisplayType(index)} />
      ))}
    </div>
  );
}

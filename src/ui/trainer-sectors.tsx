'use client';

import { TrainerSectorDisplayType, TrainerSectorPosition } from '@/constants';
import TrainerSector from './trainer-sector';
import styles from './trainer-sectors.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { useCallback, useState } from 'react';
import { useInterval } from '@/lib/hooks';
import { calculateRateCoeficient, getRandomInt } from '@/lib/utils';

const sectorPositions: TrainerSectorPosition[] = [
  TrainerSectorPosition.LEFT_UPPER,
  TrainerSectorPosition.RIGHT_UPPER,
  TrainerSectorPosition.LEFT_LOWER,
  TrainerSectorPosition.RIGHT_LOWER
];

export default function TrainerSectors() {
  const [state] = useTrainerControlsState();
  const { rate, isPlaying } = state;

  const [activeSectorIndex, setActiveSectorIndex] = useState(0);

  const intervalCallback = useCallback(() => {
    setActiveSectorIndex(getRandomInt(sectorPositions.length));
  }, []);

  useInterval(isPlaying, intervalCallback, calculateRateCoeficient(rate) * 2 * 1000);

  function getDisplayType(index: number) {
    let displayType = TrainerSectorDisplayType.STATIC;
    if (isPlaying && activeSectorIndex === index) {
      displayType = TrainerSectorDisplayType.ANIMATED;
    }
    return displayType;
  }

  return (
    <div className={styles.trainerSectors}>
      {sectorPositions.map((position, index) => (
        <TrainerSector key={position} position={position} displayType={getDisplayType(index)} />
      ))}
    </div>
  );
}

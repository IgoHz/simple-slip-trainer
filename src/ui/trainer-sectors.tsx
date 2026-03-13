'use client'

import { TrainerSectorDisplayType, TrainerSectorPosition } from '@/constants';
import TrainerSector from './trainer-sector';
import styles from './trainer-sectors.module.css';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';

const sectorPositions: TrainerSectorPosition[] = [
  TrainerSectorPosition.LEFT_UPPER,
  TrainerSectorPosition.RIGHT_UPPER,
  TrainerSectorPosition.LEFT_LOWER,
  TrainerSectorPosition.RIGHT_LOWER,
];

export default function TrainerSectors() {
  const [state] = useTrainerControlsState();
  const { isPlaying } = state;

  return (
    <div className={styles.trainerSectors}>
      {sectorPositions.map((position) => {
        const displayType = isPlaying ? TrainerSectorDisplayType.ANIMATED : TrainerSectorDisplayType.STATIC;
        return (
          <TrainerSector
            key={position}
            position={position}
            displayType={displayType}
          />
      )})}
    </div>
  );
}
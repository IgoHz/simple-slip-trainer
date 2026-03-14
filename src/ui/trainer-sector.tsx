import styles from './trainer-sector.module.css';
import { TrainerSectorDisplayType, TrainerSectorPosition } from '@/constants';
import FistImage from './fist-image';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { useMemo } from 'react';
import { calculateRateCoeficient } from '@/lib/utils';

interface Props {
  position: TrainerSectorPosition;
  displayType: TrainerSectorDisplayType;
};

export default function TrainerSector({ position, displayType }: Props) {
  const [state] = useTrainerControlsState();
  const { rate } = state;

  const style = useMemo(() => ({
    animationDuration: `${calculateRateCoeficient(rate)}s`,
  }), [rate]);

  return (
    <div className={`${styles.trainerSector} ${styles[position]}`}>
      <FistImage
       className={`${styles.image} ${styles[displayType]}`}
       style={style}
        />
    </div>
  );
}
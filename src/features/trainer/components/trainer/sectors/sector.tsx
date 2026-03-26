import styles from './sector.module.css';
import { SectorDisplayType, SectorPosition } from '@/features/trainer/config/sector';
import FistImage from './fist-image';
import { useTrainerControlsState } from '@/store/trainer-controls/provider';
import { useMemo } from 'react';
import { calcRateCoeficient } from '@/features/trainer/utils/rate';

interface Props {
  position: SectorPosition;
  displayType: SectorDisplayType;
}

export default function Sector({ position, displayType }: Props) {
  const [state] = useTrainerControlsState();
  const { rate } = state;

  const style = useMemo(
    () => ({
      animationDuration: `${calcRateCoeficient(rate)}s`
    }),
    [rate]
  );

  return (
    <div className={`${styles.sector} ${styles[position]}`}>
      <FistImage className={`${styles.image} ${styles[displayType]}`} style={style} />
    </div>
  );
}

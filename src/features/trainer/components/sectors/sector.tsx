import styles from './sector.module.css';
import {
  SectorDisplayType,
  SectorPosition
} from '@/features/trainer/config/sector';
import FistImage from './fist-image';
import { useMemo } from 'react';
import { calcRateCoeficient } from '@/features/trainer/utils/rate';
import {
  rateSelector,
  useControlsStore
} from '@/features/trainer/store/controls';
import useStoreAsync from '@/hooks/useStore';

interface Props {
  position: SectorPosition;
  displayType: SectorDisplayType;
}

export default function Sector({ position, displayType }: Props) {
  const rate = useStoreAsync(useControlsStore, rateSelector);

  const style = useMemo(
    () => ({
      animationDuration: `${calcRateCoeficient(rate)}s`
    }),
    [rate]
  );

  return (
    <div className={`${styles.sector} ${styles[position]}`}>
      <FistImage
        className={`${styles.image} ${styles[displayType] ?? ''}`}
        style={style}
      />
    </div>
  );
}

'use client';

import Sector from './sectors/sector';
import styles from './sectors.module.css';
import { useState } from 'react';
import { calcRateCoeficient } from '@/features/trainer/utils/rate';
import { useInterval } from '@/hooks/useInterval';
import {
  SectorDisplayType,
  config as sectorPositionsConfig
} from '../config/sector';
import { sectorFactory } from '../utils/sector';
import PaddingWrapper from '@/components/padding-wrapper';
import {
  isPlayingSelector,
  rateSelector,
  useControlsStore
} from '../store/controls';
import useStoreAsync from '@/hooks/useStore';

export default function Sectors() {
  const rate = useStoreAsync(useControlsStore, rateSelector);
  const isPlaying = useControlsStore(isPlayingSelector);

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
    <PaddingWrapper className={styles.sectors}>
      {sectorPositionsConfig.map((position, index) => (
        <Sector
          key={position}
          position={position}
          displayType={getDisplayType(index)}
        />
      ))}
    </PaddingWrapper>
  );
}

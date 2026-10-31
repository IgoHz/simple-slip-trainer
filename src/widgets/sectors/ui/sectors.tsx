'use client';

import styles from './sectors.module.css';
import {
  Sector,
  SectorDisplayType,
  sectorPositionsConfig
} from '@/entities/sector';
import {
  isPlayingSelector,
  modeSelector,
  rateSelector,
  resetCountSelector,
  TrainingMode,
  useSessionStore
} from '@/entities/session';
import { PaddingWrapper } from '@/shared/ui';
import { useStoreAsync } from '@/shared/lib';
import { usePlaybackEngine } from '../lib/use-playback-engine';

export interface SectorsProps {
  className?: string;
}

export default function Sectors({ className }: SectorsProps) {
  const rate = useStoreAsync(useSessionStore, rateSelector);
  const isPlaying = useSessionStore(isPlayingSelector);
  const mode =
    useStoreAsync(useSessionStore, modeSelector) ?? TrainingMode.RANDOM_SINGLES;
  const resetCount = useSessionStore(resetCountSelector);

  const { activeSectorIndex, animationDuration, animationKey } =
    usePlaybackEngine({
      isPlaying,
      rate,
      mode,
      resetCount
    });

  function getDisplayType(index: number): SectorDisplayType {
    if (isPlaying && activeSectorIndex === index) {
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
          animationDuration={animationDuration}
          animationKey={animationKey}
        />
      ))}
    </PaddingWrapper>
  );
}

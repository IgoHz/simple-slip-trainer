import { memo } from 'react';
import { Button, Icon } from '@/shared/ui';

export interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

function PlayPauseButton({ isPlaying, onClick }: PlayPauseButtonProps) {
  return (
    <Button
      aria-label={isPlaying ? 'Pause button' : 'Play button'}
      icon={isPlaying ? <Icon iconName="pause" /> : <Icon iconName="play" />}
      onClick={onClick}
    />
  );
}

export default memo(PlayPauseButton);

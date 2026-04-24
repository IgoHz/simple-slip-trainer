import Button from '@/components/button';
import { memo } from 'react';
import Icon from '@/components/icon';

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

function PlayPauseButton({ isPlaying, onClick }: Props) {
  return (
    <Button
      aria-label={isPlaying ? 'Pause button' : 'Play button'}
      icon={isPlaying ? <Icon iconName="pause" /> : <Icon iconName="play" />}
      onClick={onClick}
    />
  );
}

export default memo(PlayPauseButton);

import Button from '@/components/button';
import PauseIcon from './play-pause-button/pause-icon';
import PlayIcon from './play-pause-button/play-icon';
import { memo } from 'react';

interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

function PlayPauseButton({ isPlaying, onClick }: Props) {
  return (
    <Button icon={isPlaying ? <PauseIcon /> : <PlayIcon />} onClick={onClick} />
  );
}

export default memo(PlayPauseButton);

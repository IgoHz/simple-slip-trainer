import Button from '@/components/button';
import StopIcon from './stop-button/stop-icon';
import { memo } from 'react';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

function StopButton({ disabled, onClick }: Props) {
  return <Button icon={<StopIcon />} disabled={disabled} onClick={onClick} />;
}

export default memo(StopButton);

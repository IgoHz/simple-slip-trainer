import Button from '@/components/button';
import { memo } from 'react';
import Icon from '@/components/icon';

interface Props {
  disabled: boolean;
  onClick: () => void;
}

function StopButton({ disabled, onClick }: Props) {
  return (
    <Button
      aria-label="Stop button"
      icon={<Icon iconName="stop" />}
      disabled={disabled}
      onClick={onClick}
    />
  );
}

export default memo(StopButton);

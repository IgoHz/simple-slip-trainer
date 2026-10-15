import { memo } from 'react';
import { Button, Icon } from '@/shared/ui';

export interface StopButtonProps {
  disabled: boolean;
  onClick: () => void;
}

function StopButton({ disabled, onClick }: StopButtonProps) {
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

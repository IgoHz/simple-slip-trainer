import { memo } from 'react';
import { Button, Icon } from '@/shared/ui';

export interface ExpandButtonProps {
  className?: string;
  isExpanded: boolean;
  onClick: () => void;
}

function ExpandButton({ className, isExpanded, onClick }: ExpandButtonProps) {
  return (
    <Button
      className={className}
      aria-label={isExpanded ? 'Collapse button' : 'Expand button'}
      icon={
        isExpanded ? <Icon iconName="collapse" /> : <Icon iconName="expand" />
      }
      onClick={onClick}
    />
  );
}

export default memo(ExpandButton);

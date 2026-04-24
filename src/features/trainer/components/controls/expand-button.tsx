import Button from '@/components/button';
import { memo } from 'react';
import Icon from '@/components/icon';

interface Props {
  className?: string;
  isExpanded: boolean;
  onClick: () => void;
}

function ExpandButton({ className, isExpanded, onClick }: Props) {
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

import Button from '@/components/button';
import { memo } from 'react';
import ExpandIcon from './expand-button/expand-icon';
import CollapseIcon from './expand-button/collapse-icon';

interface Props {
  className?: string;
  isExpanded: boolean;
  onClick: () => void;
}

function ExpandButton({ className, isExpanded, onClick }: Props) {
  return (
    <Button
      className={className}
      icon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
      onClick={onClick}
    />
  );
}

export default memo(ExpandButton);

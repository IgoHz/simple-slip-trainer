'use client';

import { memo } from 'react';
import { Button, Icon } from '@/shared/ui';

export interface MenuButtonProps {
  className?: string;
  onClick: () => void;
}

export function MenuButton({ className, onClick }: MenuButtonProps) {
  return (
    <Button
      className={className}
      aria-label="Combination manager"
      title="Combination Manager"
      icon={<Icon iconName="menu" />}
      onClick={onClick}
    />
  );
}

export default memo(MenuButton);

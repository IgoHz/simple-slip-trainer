import { ReactNode } from 'react';
import clsx from 'clsx';

export interface PaddingWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PaddingWrapper({
  children,
  className
}: PaddingWrapperProps) {
  return (
    <div className={clsx('p-[var(--padding-normal)]', className)}>
      {children}
    </div>
  );
}

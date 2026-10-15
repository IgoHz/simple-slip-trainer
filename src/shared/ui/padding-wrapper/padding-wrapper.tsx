import { ReactNode } from 'react';
import styles from './padding-wrapper.module.css';

export interface PaddingWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PaddingWrapper({
  children,
  className
}: PaddingWrapperProps) {
  return (
    <div className={`${styles.paddingWrapper} ${className ?? ''}`}>
      {children}
    </div>
  );
}

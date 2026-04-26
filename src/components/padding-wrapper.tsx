import { ReactNode } from 'react';
import styles from './padding-wrapper.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PaddingWrapper({ children, className }: Props) {
  return (
    <div className={`${styles.paddingWrapper} ${className ?? ''}`}>
      {children}
    </div>
  );
}

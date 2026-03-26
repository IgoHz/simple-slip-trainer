import { ReactNode } from 'react';
import styles from './wrapper.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: Props) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>{children}</div>
  );
}

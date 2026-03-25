import { memo, ReactNode } from 'react';
import styles from './button.module.css';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ children, disabled, onClick }: Props) {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default memo(Button);

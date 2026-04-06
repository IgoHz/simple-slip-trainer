import { memo, ReactNode } from 'react';
import styles from './button.module.css';

interface Props {
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ icon, label, disabled, onClick }: Props) {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {label} {icon}
    </button>
  );
}

export default memo(Button);

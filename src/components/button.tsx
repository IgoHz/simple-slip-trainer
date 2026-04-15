import { memo, ReactNode } from 'react';
import styles from './button.module.css';

interface Props {
  className?: string;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ className, label, icon, disabled, onClick }: Props) {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </button>
  );
}

export default memo(Button);

import { ComponentProps, memo, ReactNode } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon?: ReactNode;
}

function Button({ className, label, icon, ...restProps }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ''}`} {...restProps}>
      {label} {icon}
    </button>
  );
}

export default memo(Button);

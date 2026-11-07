import { ComponentProps, memo, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

export interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon?: ReactNode;
}

function Button({ className, label, icon, ...restProps }: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-sans text-sm leading-4',
        'p-[var(--padding-normal)]',
        'text-theme-text bg-theme-background',
        'border-2 border-theme-border',
        '[&_svg]:block',
        styles.button,
        className
      )}
      {...restProps}
    >
      {label} {icon}
    </button>
  );
}

export default memo(Button);

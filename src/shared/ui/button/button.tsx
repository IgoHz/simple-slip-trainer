import { ComponentProps, memo, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

export interface ButtonProps extends ComponentProps<'button'> {
  label?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

function Button({
  className,
  label,
  icon,
  iconPosition = 'right',
  ...restProps
}: ButtonProps) {
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
      {iconPosition === 'left' && icon}
      {label}
      {iconPosition === 'right' && icon}
    </button>
  );
}

export default memo(Button);

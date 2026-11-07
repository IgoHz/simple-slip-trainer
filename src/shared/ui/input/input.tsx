import { ComponentProps, memo } from 'react';
import clsx from 'clsx';
import InputSkeleton from './input-skeleton';

export interface InputProps extends ComponentProps<'input'> {
  isLoading?: boolean;
}

function Input({ isLoading, className, ...restProps }: InputProps) {
  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <input
      className={clsx(
        'font-sans text-sm leading-4',
        'max-h-7',
        'p-[var(--padding-normal)]',
        'text-theme-text bg-theme-background',
        'border-2 border-theme-border',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-1 focus:outline-theme-border',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        '[@media(pointer:coarse)]:max-h-[1.6rem]',
        className
      )}
      {...restProps}
    />
  );
}

export default memo(Input);

import { ComponentProps, memo } from 'react';
import styles from './input.module.css';
import InputSkeleton from './input-skeleton';

export interface InputProps extends ComponentProps<'input'> {
  isLoading?: boolean;
}

function Input({ isLoading, className, ...restProps }: InputProps) {
  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <input className={`${styles.input} ${className ?? ''}`} {...restProps} />
  );
}

export default memo(Input);

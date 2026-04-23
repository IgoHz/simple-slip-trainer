import { ComponentProps, memo } from 'react';
import styles from './input.module.css';
import { RATE_COUNTER_MIN_VALUE } from '@/features/trainer/config/rate';
import InputSkeleton from './input/input-skeleton';

interface Props extends ComponentProps<'input'> {
  isLoading?: boolean;
}

function Input({ isLoading, ...restProps }: Props) {
  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <input
      min={RATE_COUNTER_MIN_VALUE}
      className={styles.input}
      {...restProps}
    />
  );
}

export default memo(Input);

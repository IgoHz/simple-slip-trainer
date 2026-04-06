import { ChangeEvent, memo } from 'react';
import styles from './input.module.css';
import { RATE_COUNTER_MIN_VALUE } from '@/features/trainer/config/rate';
import InputSkeleton from './input/input-skeleton';

interface Props {
  value: string | number | readonly string[] | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function Input({ value, disabled, isLoading, onChange, onBlur }: Props) {
  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <input
      min={RATE_COUNTER_MIN_VALUE}
      className={styles.input}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default memo(Input);

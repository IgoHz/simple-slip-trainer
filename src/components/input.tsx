import { ChangeEvent, memo } from 'react';
import styles from './input.module.css';
import { RATE_COUNTER_MIN_VALUE } from '@/features/trainer/config/rate';

interface Props {
  value: string | number | readonly string[] | undefined;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function Input({ value, disabled, onChange, onBlur }: Props) {
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

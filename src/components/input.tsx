import { ChangeEvent, memo } from 'react';
import styles from './input.module.css';

interface Props {
  value: string | number | readonly string[] | undefined;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, disabled, onChange }: Props) {
  return <input className={styles.input} value={value} disabled={disabled} onChange={onChange} />;
}

export default memo(Input);

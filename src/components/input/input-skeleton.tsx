import { memo } from 'react';
import styles from './input-skeleton.module.css';
import Icon from '../icon';

function InputSkeleton() {
  return (
    <div className={styles.inputSkeleton} data-testid="input-skeleton">
      <Icon iconName="loading" />
    </div>
  );
}

export default memo(InputSkeleton);

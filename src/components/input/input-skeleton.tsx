import { memo } from 'react';
import styles from './input-skeleton.module.css';
import LoadingIcon from './input-skeleton/loading-icon';

function InputSkeleton() {
  return (
    <div className={styles.inputSkeleton} data-testid="input-skeleton">
      <LoadingIcon />
    </div>
  );
}

export default memo(InputSkeleton);

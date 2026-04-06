import { memo } from 'react';
import styles from './input-skeleton.module.css';
import LoadingIcon from './input-skeleton/loading-icon';

function InputSkeleton() {
  return (
    <div className={styles.inputSkeleton}>
      <LoadingIcon />
    </div>
  );
}

export default memo(InputSkeleton);

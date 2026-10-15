import { PaddingWrapper } from '../padding-wrapper';
import styles from './copyright.module.css';

export interface CopyrightProps {
  className?: string;
}

export default function Copyright({ className }: CopyrightProps) {
  return (
    <PaddingWrapper className={`${styles.copyright ?? ''} ${className ?? ''}`}>
      <a
        href="https://github.com/IgoHz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit IHOR T.'s GitHub profile"
        className={typeof styles.link === 'string' ? styles.link : undefined}
      >
        &#169; {new Date().getFullYear()} IHOR T.
        <span
          className={
            typeof styles.suffix === 'string' ? styles.suffix : undefined
          }
          aria-hidden="true"
        >
          &nbsp;
          {'>'}_
        </span>
      </a>
    </PaddingWrapper>
  );
}

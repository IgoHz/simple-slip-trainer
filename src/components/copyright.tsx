import Wrapper from './wrapper';
import styles from './copyright.module.css';

export default function Copyright() {
  return (
    <Wrapper className={styles.copyright}>
      <a
        href="https://github.com/IgoHz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit IHOR T.'s GitHub profile"
        className={styles.link}
      >
        &#169; {new Date().getFullYear()} IHOR T.
        <span className={styles.suffix} aria-hidden="true">
          &nbsp;
          {'>'}_
        </span>
      </a>
    </Wrapper>
  );
}

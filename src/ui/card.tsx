import Image from 'next/image';
import styles from './card.module.css';

export default function Card() {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src="/fist.svg"
        alt="Fist image"
        width={100}
        height={100}
         />
    </div>
  );
}
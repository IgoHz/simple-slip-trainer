import Card from './card';
import styles from './trainer.module.css';

export default function Trainer() {
  return (
    <div className={styles.trainer}>
      <Card key="left-upper" />
      <Card key="right-upper" />
      <Card key="left-lower" />
      <Card key="right-lower" />
    </div>
  );
}
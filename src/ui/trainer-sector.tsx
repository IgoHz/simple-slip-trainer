import styles from './trainer-sector.module.css';
import { TrainerSectorDisplayType, TrainerSectorPosition } from '@/constants';
import FistImage from './fist-image';

interface Props {
  position: TrainerSectorPosition;
  displayType: TrainerSectorDisplayType;
};

export default function TrainerSector({ position, displayType }: Props) {
  return (
    <div className={`${styles.trainerSector} ${styles[position]}`}>
      <FistImage className={`${styles.image} ${styles[displayType]}`} />
    </div>
  );
}